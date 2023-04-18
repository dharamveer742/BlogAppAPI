const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            
        },   
    },
    {timestamps:true} // user created and updated
);

module.exports = mongoose.model("Category",categorySchema);