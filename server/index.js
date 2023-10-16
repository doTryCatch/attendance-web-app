const express = require('express');
const app = express();
const PORT =process.env.PORT || 3001
const {createCollection,get,update,Insert_data}=require("./method")
const cors=require('cors')
app.use(cors())
app.use(express.json())

app.route("/")
.get((req,res)=>{
   get(req,res);
})
.post((req,res)=>{
Insert_data(req,res,req.body)
})
.put((req,res)=>{
  // console.log(req.body)
  update(req,res,req.body)

})
.delete((req,res)=>{

});





app.listen(PORT, () => {
  console.log('listening on *:3001');
});
