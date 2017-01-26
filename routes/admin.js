var express=require('express');
var passport=require('../config/passport');
var Admin=require('../models/Admin');
var Course=require('../models/Course');

var admin=express.Router();


admin.route('/')
//find the admin.
.get(passport.authenticate('admin', { session: false}),function (req,res,next) {
	Admin.findById(req.user._id,function (err,data) {
		if(err){
			res.json({status:"false",message:err});
		}
		else{
			res.json({status:"true",message:data})
		}
	});
})
//remove a Admin. admin can only remove himself. note: id is redundanta as the requeting admin is removed
.delete(passport.authenticate('admin', { session: false}),function (req,res,next) {
	Admin.findByIdAndRemove(req.user._id,function (err,data) {
		if(err){
			res.json({status:"false",message:err});
		}else{
			res.json({status:"true",message:data});
		}
	});
});

admin.route('/all')
	//get list of all admins. 
	.get(function (req,res,next) {
		Admin.find({},function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data})
			}
		});
	});


//routes related to courses specific to admin
admin.route('/courses')
	//create a course.
	.post(passport.authenticate('admin', { session: false}),function (req,res) {
		req.body['author']=req.user._id;
		var course=Course(req.body);
		course.save(req.body,function (err,data) {
			if(err){
				//console.log(err);
				res.json({status:false,message:err});
			}
			else{
				//console.log(data);
				Admin.findByIdAndUpdate(req.user._id, { $push: {"courses": data._id }},{new:true},function (err,userData){
					if(err){
						//console.log(err);
						res.json({status:false,message:err});
					}else{
						res.send({status:true,message:data});
						//console.log(userData);
					}
				});
			};
		});
	})
	//get all courses by admin
	.get(passport.authenticate('admin', { session: false}),function (req,res) {
		Admin.findById(req.user._id).populate('courses').exec(function (err,data) {
			if(err){
				res.josn({status:false,message:err});
			}else{
				res.json({status:true,message:data.courses});
			}
		});
	});


	admin.route('/courses/:course')
	.delete(passport.authenticate('admin', { session: false}),function (req,res) {
		//console.log("delete  ", req.params.course);
		Course.findByIdAndRemove(req.params.course, function (err,data) {
			if(err){
				//console.log(err);
				res.json({status:false,message:err});
			}else{
				Admin.findByIdAndUpdate(req.user._id,{ $pop: {"courses": req.params.course }},{new:true}, function (err,data) {
					if(err){
						//console.log(err);
						res.json({status:false,message:err});
					}else{
						//console.log(data);
						res.send({status:true,message:data});
					}
				});
			}
		});
	})
	.get(function (req,res) {
		//console.log("get "+req.params.course);
		Course.findById(req.params.course).populate({path:'assignments'}).exec(function (err,data) {
			if(err){
				//console.log(err);
				res.json({status:false,message:err});
			}else{
				//console.log(data);
				res.send({status:true,message:data});
			}
		});
	});

	admin.route('/:id')
	//get a specific admin. determined by id.
	.get(passport.authenticate('admin', { session: false}),function (req,res,next) {
		Admin.findById(req.params.id,function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}else{
				res.json({status:"true",message:data});
			}
		});
	});

	module.exports=admin;