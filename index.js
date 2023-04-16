const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute  = require("./routes/auth");

app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
   
}).then(console.log("connected to mongo db")).catch((err)=> console.log(err));

app.use("/auth",authRoute);

app.use("/",(req,res)=>{
    console.log("mainUrl");
})
app.listen("5000",()=>{
    console.log("running");
})