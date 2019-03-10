const express=require("express")
const router=express.Router();
const verifyJWT=require("./verifyTokens");
router.get("/register",(req,res)=>{
    res.sendFile("register.html",{root:__dirname+"/../views"})
})
router.get("/login",(req,res)=>{
    res.sendFile("login.html",{root:__dirname+"/../views"})
})
router.get("/*",(req,res)=>{
    res.redirect("/login")
})
router.get("/home",verifyJWT,(req,res)=>{
        res.sendFile("home.html",{root:__dirname+"/../views"})
})

module.exports=router;