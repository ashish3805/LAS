var mongoose= require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema=mongoose.Schema;

var userSchema= new Schema({
	name:String,
	username:String,
	branch:String,
	password:String,
	desc:String,
	contact:Number,
	email:String,
	courses:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	}]
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getClassmates= function(cb){
	this.model('User').find({year: 3},cb);
};

var User=mongoose.model('User',userSchema);

module.exports=User;