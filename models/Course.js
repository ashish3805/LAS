var mongoose=require('mongoose');
var courseSchema=new mongoose.Schema({
	name:String,
	code:String,
	desc:String,
	assignments:[{type:mongoose.Schema.Types.ObjectId, ref:'Assignment'}]
});

var Course=mongoose.model('Course',courseSchema);
module.exports=Course;