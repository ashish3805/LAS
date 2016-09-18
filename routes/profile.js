var express=require('express');
var router=express.Router();
var passport=require('../config/passport');

router.route('/')
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		res.json({status:true,message:req.user});
	})
	.put(function (req,res) {
		res.send('got a put request');
	});

router.route('/admin')
	.get(passport.authenticate('admin', { session: false}),function (req,res,next) {
		res.json({status:true,message:req.user});
	})
	.put(function (req,res) {
		res.send('got a put request');
	})
module.exports=router;