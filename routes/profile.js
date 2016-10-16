var express=require('express');
var router=express.Router();
var passport=require('../config/passport');
var Admin=-require('../models/Admin');
var User=require('../models/User');

router.route('/')
.get(passport.authenticate('user', { session: false}),function (req,res,next) {
	res.json({status:true,message:req.user});
})
.put(passport.authenticate('user', { session: false}),function (req,res) {
	User.findByIdAndUpdate(req.user._id,{ 
		"$set": { 
			"name": req.body.name,
			"email": req.body.email,
			"contact": req.body.contact,
			"branch": req.body.branch,
			"desc": req.body.desc
		}
	}, {new:true}, function (err,data) {
		if(err){
			res.json({status:"false",message:err});
		}
		else{
			res.json({status:"true",message:data})
		}
	});
});

router.route('/admin')
.get(passport.authenticate('admin', { session: false}),function (req,res,next) {
	res.json({status:true,message:req.user});
})
.put(function (req,res) {
		Admin.findByIdAndUpdate(req.user._id,{ 
		"$set": { 
			"name": req.body.name,
			"email": req.body.email,
			"contact": req.body.contact,
			"dept": req.body.branch,
			"desc": req.body.desc
		}
	},{new:true},function (err,data) {
		if(err){
			res.json({status:"false",message:err});
		}
		else{
			res.json({status:"true",message:data})
		}
	});
});

router.route('/password')
	.put(passport.authenticate('user', { session: false}),function (req,res,next) {
		
	})

module.exports=router;