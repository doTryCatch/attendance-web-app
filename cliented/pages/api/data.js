// pages/api/data.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Raone:roshan12@cluster0.muoib0h.mongodb.net/";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default async function get(req,res){
  let client;
  try {
    client = new MongoClient(uri, options);
    await client.connect();

    const collection = client.db("stock").collection("inventory");
    const data = await collection.find().toArray();

    res.status(200).json(data);
   
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.close();
    }
  }
}
// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   let client;

//   try {
//     client = new MongoClient(uri, options);
//     await client.connect();

//     const collection = client.db("stock").collection("inventory");
//     const data = await collection.find().toArray();

//     res.status(200).json({ data });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     res.status(500).json({ message: "Internal server error" });
//   } finally {
//     if (client) {
//       client.close();
//     }
//   }
// }
