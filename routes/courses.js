var express=require('express');
var Question=require('../models/Question');
var Course=require('../models/Course');
var Assignment=require('../models/Assignment');
var course=express.Router();

course.route('/')
	.post(function (req,res) {
		var course=Course(req.body);
		course.save(req.body,function (err,data) {
			if(err){
				console.log(err);
				res.send(err);
			}else{
				console.log(data);
				res.send(data);
			}
		});
	})
	.get(function (req,res) {
		Course.find({},function (err,data) {
			if(err){
				console.log(err);
				res.send(err);
			}else{
				console.log(data);
				res.send(data);
			}
		});
	});

course.route('/:id')
	.put(function (req,res) {
		console.log("put");
		res.send("put");
	})
	.delete(function (req,res) {
		console.log("delete");
		res.send("delete");
	})
	.get(function (req,res) {
		console.log("get");
		res.send("get");
	});
module.exports=course;