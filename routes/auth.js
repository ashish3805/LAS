var express=require('express');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var router=express.Router();
var user={
			username:'username',
			password:'password'
		}

router.route('/')
	.post(function (req,res) {
		res.send(req.body);
	})
	.get(function (req,res) {
		res.send(req.headers);
		passport.use(new localStrategy(function (username,password,done) {
										findUser(username,function (err,user) {
											if(err){
													console.log(err);
											}
											if(!user){
													console.log("user not found");
											}
											if(password==user.password){
													console.log("success");
											}
											})	
									}
			))
		
	})
	module.exports=router;