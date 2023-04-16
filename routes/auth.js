const router = require("express").Router();
const User = require("../models/users")
const bcrypt = require("bcrypt");

// register

router.post("/register",async (req,res)=>{
    try{
        const hashedPass = await bcrypt.hash(req.body.password,10);
        const newUser = new User(
            {
                username:req.body.username,
                email:req.body.email,
                password:hashedPass,
            }
        )
        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong Credentials");
        const validate =  await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(400).json("Wrong Credentials");
        
        const {password,...others} = user._doc;  // we do not want to send the hashed password to frontend so  we are excluding.
        
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;