const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const port=process.env.PORT || 3000;
const io = require('socket.io')(server);
const dotenv=require("dotenv");
const User=require("./models/user")
dotenv.config();

//Creating namespaces
var activation=io.of('/activation');

//Namespace Methods
var handleActivation=(socket)=>{
    socket.on("assignID",(data)=>{
        var userID=data.id;
        var location=data.location;
        User.findOneAndUpdate({id:userID},{$set:{active:true,location:location}},{new:true}).then((updatedUser)=>{
            console.log(updatedUser);
        })

    })
}

//Database configuration
const URI=process.env.URI || "mongodb://localhost/wth19";
mongoose.connect(URI,{useNewUrlParser:true}).then((e)=>{
    console.log("Database Connected");
}).catch((err)=>{
    throw err;
})

//Configuring the express instance
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.static(__dirname+'/views'));  

//Requiring Routes
const useroutes=require("./routes/userRoutes")
const pageroutes=require("./routes/pageRoutes")
//Using Routes
app.use("/api",useroutes)
app.use("/",pageroutes)

//Defining namespace methods
activation.on("connection",handleActivation);
//Starting the server
app.listen(port,(err)=>{
    if(err)
    throw err;
    console.log("Server running at port "+port);
})