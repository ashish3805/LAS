var mongoose=require('mongoose');
var adminSchema=new mongoose.Schema({
	name:String,
	year:Number,
	dept:String,
	desc:String	
});
var Admin=mongoose.model('Admin',adminSchema);
model.exports=Admin;