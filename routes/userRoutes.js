const express=require("express");
const router=express.Router();
const User=require("../models/user");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
router.post("/register",function(req,res){
    var hashedPass=bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPass,
        phoneNum:req.body.phnum
    },function(err,user){
        if(err)
        res.send("There was a problem registering the user").status(500);
        var token = jwt.sign({ id: user._id }, process.env.secretKey, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token,user:user });

    })
})
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, process.env.secretKey, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token,user:user });
    });
  });
  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null,user:null });
  });  
module.exports=router