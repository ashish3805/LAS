var express=require('express');
var router=express.Router();
var passport=require('../config/passport');

router.route('/')
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		res.send(req.user);
	})
	.put(function (req,res) {
		res.send('got a put request');
	})
module.exports=router;