const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        profilepic:{
            type:String,
            default:"",
        }
    },
    {timestamps:true} // user created and updated
);

module.exports = mongoose.model("User",userSchema);