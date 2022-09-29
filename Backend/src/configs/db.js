
const  mongoose =require("mongoose");
module.exports= ()=>{
return mongoose.connect("mongodb+srv://soniya:12345@cluster0.ymjbv.mongodb.net/chat_app?retryWrites=true&w=majority")
} ;