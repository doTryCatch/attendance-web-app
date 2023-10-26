// pages/api/data.js

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://Raone:roshan12@cluster0.muoib0h.mongodb.net/";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
export default async function handle_request(req,res){
  // res.status(200).json("server is working")
  // get(req,res)
 switch(req.method){
  case "POST": res.send("welcome to POST services")
   break;
   case "GET": get(req,res)
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

