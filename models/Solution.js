var mongoose=require('mongoose');

var solutionSchema=new mongoose.Schema({
	content:String,
	question:[{type:mongoose.Schema.Types.ObjectId, ref:'Question'}],
	score:Number,
	status:Boolean,
	user:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
});

var Solution=mongoose.model('Solution',solutionSchema);
module.exports=Solution;