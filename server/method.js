
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://Raone:roshan12@cluster0.muoib0h.mongodb.net/";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbName = "stock";
const coll="inventory"
const client = new MongoClient(url, options);
//create collection
const newCollection=async (name)=> {
  let client;
  try {
    client = new MongoClient(url, options);
    await client.connect();
    const db = client.db(dbName);
      await db.createCollection(name);
      console.log(`Collection ${name} created successfully.`);
    
  } catch (err) {
    console.error("Error creating collections:", err);
  } finally {
    await client.close();
  }
}

//get data
const get=async(req,res)=>{
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

//update data
const update = async (req, res,dataList) => {
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



//insert data 

const Insert_data = async (req, res, data) => {
  let client;

  try {
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(data.branch).collection("section_"+data.section);
    
    const result = await db.insertOne({
      name: data.name,
      roll: data.roll,
      percentage: "0",
      record: []
    });
console.log("success",data)
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

// Example usage:
// Insert_data(req, res, { name: 'John', roll: 101, class: 'A' });


module.exports ={newCollection,get,update,Insert_data};



