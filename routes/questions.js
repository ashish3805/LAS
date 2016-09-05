var express=require('express');
var Question=require('../models/Question');
var questions=express.Router();

questions.route('/')
	.post(function (req,res) {
		var question=Question(req.body);
		question.save(req.body,function (err,data) {
			if(err){
				console.log(err);
				res.send(err);
			}else{
				console.log(data);
				res.send(data);
			}
		})
	})
	.get(function (req,res) {
		Question.find({},function (err,data) {
			if(err){
				console.log(err);
				res.send(err);
			}else{
				console.log(data);
				res.send(data);
			}
		});
	});

questions.route('/:id')
	.put(function (req,res) {
		console.log("put");
		res.send("put");
	})
	.get(function (req,res) {
		console.log("get id");
		res.send("get id");
	})
	.delete(function (req,res) {
		console.log("delete");
		res.send("delete");
	});
module.exports=questions;
