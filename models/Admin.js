var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema=mongoose.Schema;

var adminSchema=new mongoose.Schema({
	name:String,
	password:String,
	email:String,
	contact:Number,
	dept:String,
	desc:String	
});


adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;