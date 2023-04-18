const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute  = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories")

const multer = require("multer");



app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
   
}).then(console.log("connected to mongo db")).catch((err)=> console.log(err));

const storage =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload = multer({storage:storage})
app.post("/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})

app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/posts",postsRoute);
app.use("/categories",categoriesRoute);

app.use("/",(req,res)=>{
    console.log("mainUrl"); 
})
app.listen("5000",()=>{
    console.log("running");
})