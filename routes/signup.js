var express=require('express');
var passport=require('../config/passport');
var router=express.Router();
var User=require('../models/User');
var jwt = require('jsonwebtoken');
var secret="apurva";

router.route('/')
.post(function (req,res,next) {
	var data=req.body;
	User.findOne({'username':data.username},function (err,user) {
		if(err){
			res.json({status:false,message:"Error sigining up!"});
		}
		if(user){
			res.json({status:false,message:"Enrollment already registered!"});
		}
		else{
			var user = new User(data);
			user.password=user.generateHash(data.password);
			user.save(function (err,user) {
				if(err)
					res.json({status:fasle,message:"Error could not create user!"})
				else{
					var token=jwt.sign(user,secret,{expiresIn:'2 days'});
					res.json({status:true,token:token,message:user});
				}
			});
		}
	});
});

module.exports=router;