const express = require("express");

const app = express();
const  userControllers = require("./controllers/user.controllers")
const connect = require("./configs/db");
const {register,login} = require("./controllers/auth.controllers")
app.use(express.json());


// creatre router connection...
app.use("/users",userControllers);
app.post("/register",register);
app.post("/login",login);



app.listen(8000, async()=>{
try{
   await connect(); 
   console.log("listening on port 8000");
}
catch(err){
    console.log(err.message)
}
})