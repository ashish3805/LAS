var express=require('express');
var Question=require('../models/Question');
var course=express.Router();

course.route('/')
	.post(function (req,res) {
		console.log("post");
		res.send("post");
	})
	.get(function (req,res) {
		console.log("get");
		res.send("get");
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