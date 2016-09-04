var mongoose=require('mongoose');
var assignmentSchema=new mongoose.Schema({
	title:String,
	desc:String
});

var Assignment=mongoose.model('Assignment',assignmentSchema);
module.exports=Assignment;