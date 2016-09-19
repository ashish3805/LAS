var express=require('express');
var passport=require('../config/passport');
var User=require('../models/User');
var Admin=require('../models/Admin');
var jwt = require('jsonwebtoken');
var secret="apurva";
var router=express.Router();

router.route('/')
	.post(function (req,res,next) {
		User.findOne({'username':req.body.username},function (err,user) {
			if(err){
				res.json({status:false,message:err});
			}
			else if(!user){
				res.json({status:false,message:"Enrollment not registered!"});
			}
			else if (!(user.validPassword(req.body.password))) {
				res.json({status:false,message:"Incorrect password!"});
			}
			else{
				var token=jwt.sign({id:user._id},secret,{expiresIn:'2 days'});
				res.json({status:true,message:user,token:token});
			}
		});
	});
router.route('/admin')
	.post(function (req,res,next) {
		Admin.findOne({'email':req.body.email},function (err,user) {
			if(err){
				res.json({status:false,message:"Database error!"});
			}
			else if(!user){
				res.json({status:false,message:"Admin not registered!"});
			}
			else if(!(user.validPassword(req.body.password))){
				res.json({status:false,message:"Incorrect password!"});
			}
			else{
				var token=jwt.sign({id:user._id},secret,{expiresIn:'2 days'});
				res.json({status:true,message:user,token:token});				
			}
		});
	});

module.exports=router;