var JwtStrategy=require('passport-jwt').Strategy;
var passport=require('passport');
var ExtractJwt=require('passport-jwt').ExtractJwt;
var User=require('../models/User');
var JwtStrategy=require('passport-jwt').Strategy;
var passport=require('passport');
var ExtractJwt=require('passport-jwt').ExtractJwt;
var Admin=require('../models/Admin');


passport.use('user',new JwtStrategy({
	jwtFromRequest :ExtractJwt.fromAuthHeader(),
	secretOrKey : 'apurva',
},
function(jwt_payload, done) {
	User.findOne({ '_id' :jwt_payload.id}, function(err, user) {
		if (err){
			return done(err);
		}
		if (!user){
			return done(null, false, {message:'User not found'});
		}
		return done(null, user);
	});
}));

passport.use("admin",new JwtStrategy({
	jwtFromRequest :ExtractJwt.fromAuthHeader(),
	secretOrKey : 'apurva',
},
function(jwt_payload, done) {
	Admin.findOne({ '_id' :jwt_payload.id}, function(err, user) {
		if (err){
			return done(err);
		}
		if (!user){
			return done(null, false, {message:'User not found'});
		}
		return done(null, user);
	});
}));

module.exports=passport;
