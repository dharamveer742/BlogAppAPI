const router = require("express").Router();
const User = require("../models/users")
const Post = require("../models/post")
const bcrypt = require("bcrypt");

// update

router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password,10);
        }
        try{
             const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
             },{new:true})  // to return updated user
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

// Delete a user and it's posts

router.delete("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id){
        try{
            const user = await User.findById(req.params.id);

            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted")
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        catch(err){
            res.status(404).json("user not found !")
        }
        
    }
    else{
        res.status(401).status("you can delete only your account");
    }
})

// get a user

router.get("/:id",async (req,res)=>{
   
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        console.log(user);
        res.status(200).json(others)                                                                            //  If the document is not found, the function returns null.
    }
    catch(err){
        res.status(500).json(err);
    }
    
})


module.exports = router;