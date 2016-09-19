var mongoose=require('mongoose');
var Course=require("./Course");
var bcrypt   = require('bcrypt-nodejs');
var Schema=mongoose.Schema;

var adminSchema=new mongoose.Schema({
	name:String,
	password:String,
	email:String,
	contact:Number,
	dept:String,
	desc:String,
	courses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }]
});


adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//course methods
adminSchema.methods.addCourse= function (courseDetail) {
	var course= new Course(courseDetail);
	return course.save(function (err, newCourse) {
		if(err){

		} else{
			this.courses.push(newCourse._id);
		}
	});
	return this.courses;
};


var Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;