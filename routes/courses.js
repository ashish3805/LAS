var express=require('express');
var Question=require('../models/Question');
var Course=require('../models/Course');
var Assignment=require('../models/Assignment');
var course=express.Router();
var passport=require('../config/passport');
var Admin=require('../models/Admin');
var User=require('../models/User');


course.route('/')
.post(passport.authenticate('admin', { session: false}),function (req,res) {
	var course=Course(req.body);
	course.save(req.body,function (err,data) {
		if(err){
			//console.log(err);
			res.json({status:false,message:err});
		}else{
			//console.log(data);
			Admin.findByIdAndUpdate(req.user._id, { $push: {"courses": data._id }},{new:true},function (err,userData){
					if(err){
						//console.log(err);
						res.json({status:false,message:err});
					}else{
						res.send({status:true,message:data});
						console.log(userData);
					}
			});
		};
	});
})
.get(passport.authenticate('admin', { session: false}),function (req,res) {
	Admin.findById(req.user._id).populate('courses').exec(function (err,data) {
		if(err){
			res.josn({status:false,message:err});
		}
			res.json({status:true,message:data.courses});
	});
});

course.route('/:id')
.put(passport.authenticate('admin', { session: false}),function (req,res) {
	console.log("put");
	res.send("put");
})

.delete(passport.authenticate('admin', { session: false}),function (req,res) {
	console.log("delete  ", req.params.id);
	Course.findByIdAndRemove(req.params.id, function (err,data) {
		if(err){
			console.log(err);
			res.json({status:false,message:err});
		}else{
			console.log(data);
			res.send({status:true,message:data});
		}
	});
})
.get(function (req,res) {
	console.log("get "+req.params.id);
	Course.findById(req.params.id,function (err,data) {
		if(err){
			console.log(err);
			res.json({status:false,message:err});
		}else{
			console.log(data);
			res.send({status:true,message:data});
		}
	});
});
module.exports=course;