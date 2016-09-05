var mongoose=require('mongoose');

var solutionSchema=new mongoose.Schema({
	desc:String
});

var Solution=mongoose.model('Solution',solutionSchema);
module.exports=Solution;