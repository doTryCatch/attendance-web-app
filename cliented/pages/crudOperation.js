const url="http://localhost:3001/"
const Update=async (updateData)=>{
    try{
      const res=await fetch(url,{method:'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    const data=await res.json();
    }catch(error){
      console.error("Failed to fetch data:", error)

    }
   
  }


let cachedData = null;
const  Get=async()=> {
  if (cachedData) {
    return cachedData;
  }
  // Fetch data from the server
  try{
    const res=await fetch(url,{
      method: 'get',
headers: {
"Content-Type": "application/json",
"x-access-token": "token-value",
}
    });
    const data=await res.json();
    
    cachedData=data;
   return data
  }catch(error){
    console.error("Failed to fetch data:", error)

  }

  return data;
}
  const Post=async(insertData)=>{
 
    try{
      const res=await fetch(url,{
        method:"post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(insertData)
      });
      const data=await res.json();
    }catch(error){
      console.error("Failed to fetch data:", error)

    }
 
    
  
}
  module.exports ={Update,Get,Post}