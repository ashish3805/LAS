var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var userSchema= new Schema({
	name:String,
	password:String,
	year:Number,
	desc:String
});

userSchema.methods.getClassmates= function(cb){
	this.model('User').find({year: 3},cb);
};

var User=mongoose.model('User',userSchema);