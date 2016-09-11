var localStrategy=require('passport-local').Strategy;
var User=require('../models/User');

module.exports=function(passport){
	passport.serializeuser(function (user,done) {
		done(null,user.id);
	});
	passport.deserializeUser(function (id,done) {
		User.findById(id,function (err,user) {
			done(err,user);
		});
	});
	passport.use('local-signup',new localStrategy({
		passReqToCallback:true
	},
	function (req,username,password,done) {
		process.nextTick(function () {
			User.findOne({'username':username},function (err,user) {
				if(err)
					return done(err);
				if(user){
					return done(null,user,req.flash('signUpMessage','Enrollment Number already registered'));
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
		});
	}));
	passport.use('local-login', new LocalStrategy({
		passReqToCallback : true
	},
	function(req,username, password, done) {
		User.findOne({ 'username' :username}, function(err, user) {
			if (err)
				return done(err);
			if (!user)
				return done(null, false, req.flash('loginMessage', 'User not found.'));
			if (!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Incorrect password.')); 
			else
				return done(null, user);
		});
	}));
}