var express=require('express');
var passport=require('passport');
var router=express.Router();

router.route('/')
	.post(function (req,res) {
		res.send(req.body);
	})
	.get(function (req,res) {
		res.send(req.headers);
		
	})
	module.exports=router;