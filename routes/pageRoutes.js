const express=require("express")
const router=express.Router();
const verifyJWT=require("./verifyTokens");
router.get("/",verifyJWT,(req,res)=>{
    res.send("Hello")
})


module.exports=router;