var express=require('express');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var router=express.Router();
var user={
			username:'username',
			password:'password'
		}

router.route('/')
	.post(function (req,res,next) {
		//res.send(req.body);
		passport.authenticate('local-signup', function(err, user, info) {
    		if (err) { 
    			return next(err); 
    		}
    		if (!user) { 
    			return res.json({ signUpStatus:false, err:info });
    			}
    		req.logIn(user, function(err) {
      		if (err) { 
      			return next(err);
      		 	}
      		return res.json({ signUpStatus:true, user:user });
    });
  })(req, res, next)
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
		console.log(req.headers.username,req.headers.password);
	})
	module.exports=router;