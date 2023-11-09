import jwt from "jsonwebtoken"
const KEY=process.env.SECRET_KEY;
export default (req,res)=>{
    if(req.method=="POST"){
        const token = req.headers.authorization.split(' ')[1];

        console.log("reached",token)

        try{
            const decode=jwt.verify(token,JSON.stringify(KEY))
            return res.status(200).json({info:decode})
        }catch(err){
            // console.log(err)
            return res.status(401).json({error:"Authorizatoin failed"})
        }
           
        
        

    }
  
   
}