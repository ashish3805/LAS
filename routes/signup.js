var express=require('express');
var passport=require('../config/passport');
var router=express.Router();

router.route('/')
.post(function (req,res,next) {
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
	})(req, res, next);
});
	
module.exports=router;