
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    password:{type:String ,required:true}
},
{
timestamps:true,
versionKey:false
}
)

// there only plain function work not async

userSchema.pre("save",function(next){
    console.log(this.password);
    // let hashedPassword = this.password+"addsometings";
    // this.password =hashedPassword
    const hash = bcrypt.hashSync(this.password,8);
    this.password = hash;
    return next();
})


userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

const User =  mongoose.model("user",userSchema);
module.exports=User;