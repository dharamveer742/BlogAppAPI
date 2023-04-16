const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        desc:{
            type:String,
            required:true,
        },
        photo:{
            type:String,
            required:false
        },
        username:{
            type:String,
            required:true,
        },
        categories:{
            type:Array,
            required:false
        }

    },
    {timestamps:true} // user created and updated
);

module.exports = mongoose.model("Post",postSchema);