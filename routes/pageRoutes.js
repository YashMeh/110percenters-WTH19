const express=require("express")
const router=express.Router();

router.get("/",(req,res)=>{
    res.sendFile("home.html",{root:__dirname+"/../views"})
})

module.exports=router;