const router = require("express").Router();
const User = require("../models/users")
const bcrypt = require("bcrypt");

// update

router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            req.body.password = bcrypt.hash(req.body.password,10);
        }
        try{
             const updatedUser = User.findByIdAndUpdate(req.params.id,{
                $set:req.body
             }) 
             res.status(200).json(updatedUser)  
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You can update only your account");
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