// pages/api/data.js

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://Raone:roshan12@cluster0.muoib0h.mongodb.net/";
const Database="USERS"
const Collection="info"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//update data
const update = async (req, res) => {
  console.log("update is going on")
  let client;
  const data=req.body;
  try {
    client = new MongoClient(url, options);
    await client.connect();
    const db = client.db(Database).collection(Collection);  
      await db.updateOne(
        {email:data.email}, // Specify the query to match the document(s) with the desired roll number
        { $set: { password: data.password } } // Use the $set operator to update the field
        );

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
let client;
  try {
     client = new MongoClient(url, options);
    await client.connect();

  const collection=client.db(Database).collection(Collection)
  const data=await collection.find().toArray()

    res.status(200).json(data);
   
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

const insert = async (req, res) => {
  let client;
  const data=req.body

  try {
    console.log("inserting the data in database")
    client = new MongoClient(url, options);
    await client.connect();
    const db = client.db(Database).collection(Collection);

    // this area is to insert the data as a new entry to particular department  of particular section
    const result = await db.insertOne({
      email: data.email,
      password: data.password,
     role:data.role,
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

 switch(req.method){
  case "PUT": update(req,res)
   break;
   case "GET": get(req,res)
   break;
   case "POST": insert(req,res)
   break;

  default:
    break;
 }
}

