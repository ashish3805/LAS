var JwtStrategy=require('passport-jwt').Strategy;
var passport=require('passport');
var ExtractJwt=require('passport-jwt').ExtractJwt;
var User=require('../models/User');

//signup strategy
passport.use('jwt-signup',new JwtStrategy({
	jwtFromRequest :ExtractJwt.fromAuthHeader(),
	secretOrKey : 'apurva',
	passReqToCallback : true
},function (req,jwt_payload, done) {
		console.log(req.body);
		User.findOne({'username':req.body.username},function (err,user) {
			if(err)
				return done(err);
			if(user){
				return done(null,user,{message: 'Enrollemnt number already registered'});
			}else{
				var user=new user();
				user.username=username;
				user.password=generateHash(password);
				user.save(function (err) {
					if(err)
						return done(err);
					else
						return done(null,user);
				});

			}
		});
}));

// end signup strategy

// signin strategy
passport.use('jwt-signin', new JwtStrategy({
	jwtFromRequest :ExtractJwt.fromAuthHeader(),
	secretOrKey : 'apurva'
},
function(jwt_payload, done) {
	User.findOne({ 'username' :jwt_payload.username}, function(err, user) {
		if (err)
			return done(err);
		if (!user)
			return done(null, false, {message:'User not found'});
		if (!user.validPassword(password))
			return done(null, false, {message:'Incorrect password'}); 
		else
			return done(null, user);
	});
}));

// end signin strategy

//passport.signin
module.exports.signin= function (req, res, next) {
	passport.authenticate('jwt-signin', function(err, user, info) {
		if (err) { 
			return next(err); 
		}
		if (!user) { 
			return res.json({ status:false, message:info });
		}
		req.logIn(user, function(err) {
			if (err) { 
				return next(err);
			}
			return res.json({ status:true, message:user });
		});
	})(req, res, next);
};
//end passport.signin

//passport.signup
module.exports.signup= function (req, res, next) {
	passport.authenticate('jwt-signup', function(err, user, info) {
		if (err) { 
			return next(err); 
		}
		if (user) { 
			return res.json({ status:true, message:user });
		}
	})(req, res, next);
};
//end passport.signup
