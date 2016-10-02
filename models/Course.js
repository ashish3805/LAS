var mongoose=require('mongoose');
var courseSchema=new mongoose.Schema({
	name:String,
	code:String,
	desc:String,
	assignments:[{type:mongoose.Schema.Types.ObjectId, ref:'Assignment'}],
	author:[{type:mongoose.Schema.Types.ObjectId, ref:'Admin'}]
});

var Course=mongoose.model('Course',courseSchema);
module.exports=Course;