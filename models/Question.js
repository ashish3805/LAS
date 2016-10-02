var mongoose=require('mongoose');
var questionSchema=new mongoose.Schema({
	number:Number,
	marks:Number,
	desc:String,
	assignment:[{type:mongoose.Schema.Types.ObjectId, ref:'Assignment'}]
});

var Question=mongoose.model('Question',questionSchema);
module.exports=Question;