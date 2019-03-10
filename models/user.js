var mongoose=require("mongoose");

var userSchema=new mongoose.Schema({
    name:String,
    email:String,
    phoneNum:Number,
    location:Array,
    password:String,
    people:Array
})

module.exports=mongoose.model("user",userSchema);
