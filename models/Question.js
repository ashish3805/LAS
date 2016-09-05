var mongoose=require('mongoose');
var questionSchema=new mongoose.Schema({
	number:Number,
	marks:Number,
	desc:String
});

var Question=mongoose.model('Question',questionSchema);
module.exports=Question;