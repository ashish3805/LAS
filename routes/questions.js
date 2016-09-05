var express=require('express');
var Questions=require('../models/Question');
var questions=express.Router();

questions.route('/')
	.post(function (req,res) {
		console.log('post');
		res.send("post");
	})
	.get(function (req,res) {
		console.log('get');
		res.send("get");
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
