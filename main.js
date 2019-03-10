const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const port=process.env.PORT || 3000;
const io = require('socket.io')(server);
const dotenv=require("dotenv");
dotenv.config();

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
const apiroutes=require("./routes/apiRoutes")

//Using Routes
app.use("/api",apiroutes)

//Starting the server
app.listen(port,(err)=>{
    if(err)
    throw err;
    console.log("Server running at port "+port);
})