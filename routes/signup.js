var express=require('express');
var passport=require('../config/passport');
var router=express.Router();
var User=require('../models/User');
var Admin=require('../models/Admin');
var jwt = require('jsonwebtoken');
var secret="apurva";

router.route('/super/user')
.post(function (req,res,next) {
	var user= new User({});
	var password=user.generateHash(req.body.password);
	User.findOneAndUpdate({"username":req.body.username},{"$set":{"password":password}},{new:true}).exec(function (err,data) {
		if(err){
			res.json({status:false,message:"Error updating password!"});
		}else{
			res.json({status:true,message:data});
		}
	})
});
router.route('/super/admin')
.post(function (req,res,next) {
	var user= new Admin({});
	var password=user.generateHash(req.body.password);
	Admin.findOneAndUpdate({"email":req.body.email},{"$set":{"password":password}},{new:true}).exec(function (err,data) {
		if(err){
			res.json({status:false,message:"Error updating password!"});
		}else{
			res.json({status:true,message:data});
		}
	})
})

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
					res.json({status:false,message:"Error could not create user!"})
				else{
					var token=jwt.sign(user,secret,{expiresIn:'2 days'});
					res.json({status:true,token:token,message:user});
				}
			});
		}
	});
})
//update password
.put(passport.authenticate('user', { session: false}),function (req,res,next) {
			var password=req.user.generateHash(req.body.password);
			User.findByIdAndUpdate(req.user._id,{'$set':{'password':password}},{new:true},function (err,user) {
				if(err)
					res.json({status:false,message:"Error could not update password!"})
				else{
					var token=jwt.sign(user,secret,{expiresIn:'2 days'});
					res.json({status:true,token:token,message:user});
				}
			});
});

router.route('/admin')
.post(function (req,res,next) {
	var data=req.body;
	//console.log(req.body);
	Admin.findOne({'email':data.email},function (err,user) {
		if(err){
			res.json({status:false,message:"Error sigining up!"});
		}
		if(user){
			res.json({status:false,message:"Admin already registered!"});
		}
		else{
			var admin = new Admin(data);
			admin.password=admin.generateHash(data.password);
			admin.save(function (err,user) {
				if(err)
					res.json({status:false,message:"Error could not create an Admin!"})
				else{
					var token=jwt.sign(user,secret,{expiresIn:'2 days'});
					res.json({status:true,token:token,message:user});
				}
			});
		}
	});
	Admin.find({},function (err,data) {
		//console.log(data);
	})
})
//update password
.put(passport.authenticate('admin', { session: false}),function (req,res,next) {
			var password=req.user.generateHash(req.body.password);
			Admin.findByIdAndUpdate(req.user._id,{'$set':{'password':password}},{new:true},function (err,user) {
				if(err)
					res.json({status:false,message:"Error could not update password!"})
				else{
					var token=jwt.sign(user,secret,{expiresIn:'2 days'});
					res.json({status:true,token:token,message:user});
				}
			});
});
module.exports=router;