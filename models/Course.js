var mongoose=require('mongoose');
var courseSchema=new mongoose.Schema({
	name:String,
	code:String,
	desc:String
});

var Course=mongoose.model('Course',courseSchema);
module.exports=Course;