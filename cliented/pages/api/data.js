// pages/api/data.js

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://Raone:roshan12@cluster0.muoib0h.mongodb.net/";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//update data
const update = async (req, res,dataList) => {
  console/log("update is going on")
  let client;
  try {
    client = new MongoClient(url, options);
    await client.connect();
    const db = client.db(dataList[0].branch).collection(dataList[0].section);  
    console.log(dataList[0].branch,dataList[0].section)
    const data= dataList[0].dataToUpdate
    // console.log(dataList)
if(Array.isArray(dataList)){
  try {
    for (const all in data){
      await db.updateOne( { roll: data[all].roll },
          { $push: { record: {date: new Date().toISOString().slice(0, 10), status: data[all].status} } });
      const Record=await db.findOne({roll:data[all].roll})  
      const present_val=Record.record.filter(elem=>elem.status=="present")

      const att_percent=(present_val.length/Record.record.length)*100
      await db.updateOne(
        { roll: data[all].roll }, // Specify the query to match the document(s) with the desired roll number
        { $set: { percentage: att_percent.toString() } } // Use the $set operator to update the field
      );
     }
   
  } catch (err) {
    console.log(err);
  }

}
else{
      await db.updateOne(
        { roll: dataList.roll }, // Specify the query to match the document(s) with the desired roll number
        { $set: { attendencePercentage: data.percentage } } // Use the $set operator to update the field
      );
    }
 
  
    console.log("successfully update data:",dataList)
    res.status(200).json("Data is updated successfully");

  } catch (err) {
    res.status(500).json({ message: "Update request failed: " + err });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

const  get=async(req,res)=>{
  console.log("get ala")
  let client,Data=[];
  try {
     client = new MongoClient(url, options);
    await client.connect();
    const admin = client.db().admin();
const dbInfo = await admin.listDatabases();
const branch=dbInfo.databases.filter(elem=>elem.name!="local"&&elem.name!="admin")
for (const i in branch){
  const section=await client.db(branch[i].name).listCollections().toArray()
  for(const j in section){
  const collection=client.db(branch[i].name).collection(section[j].name)
  const data=await collection.find().toArray()
 Data.push({branch:branch[i].name,section:section[j].name,data:data})
  }
}
console.log(Data)
    res.status(200).json(Data);
   
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
// insertion operation ..function

const Insert_data = async (req, res, data) => {
  let client;

  try {
    console.log("inserting the data in database")
    client = new MongoClient(url, options);
    await client.connect();
    const db = client.db(data.branch).collection("section_"+ data.section);
    
    const result = await db.insertOne({
      name: data.name,
      roll: data.roll,
      percentage: "0",
      record: []
    });
console.log("added successfully",data)
    res.status(200).json(`Data: ${JSON.stringify(data)} is inserted successfully with _id: ${result.insertedId}`);
  } catch (err) {
    console.error("Insert operation failed:", err);
    res.status(500).send("Insert operation failed");
  } finally {
    if (client) {
      client.close();
    }
  }
};

export default async function handle_request(req,res){
  // res.status(200).json("server is working")
  // get(req,res)
 switch(req.method){
  case "PUT": update(req,res,req.body)
   break;
   case "GET": get(req,res)
   break;
   case "POST": Insert_data(req,res,req.body)
   break;

  default:
    break;
 }
}

// export default async function get(req,res){
//   let client;
//   try {
//     client = new MongoClient(uri, options);
//     await client.connect();

//     const collection = client.db("stock").collection("inventory");
//     const data = await collection.find().toArray();

//     res.status(200).json(data);
   
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     res.status(500).json({ message: "Internal server error" });
//   } finally {
//     if (client) {
//       client.close();
//     }
//   }
// }

