const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const user=require("../models/user");

router.get("/addUser",(req,res)=>{
    user.find().then((allUsers)=>{
        res.json(allUsers);
    }).catch((err)=>{
        res.send(err);
    })
    
})
router.post("/addUser",(req,res)=>{
    var userObj=req.body;
    user.create(userObj).then((newUser)=>{
        res.json({registered:true});
    }).catch((err)=>{
        res.send(err);
    })
    
})
module.exports=router