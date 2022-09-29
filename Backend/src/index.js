const express = require("express")
const app = express();
app.use(express.json());
const connect = require("./configs/db")

app.listen(8000, async()=>{
try{
   await connect();
   console.log("listening on port 8000");
}
catch(err){
    console.log(err.message)
}
})