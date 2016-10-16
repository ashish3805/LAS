var express=require('express');
var passport=require('../config/passport');
var User=require('../models/User');
var Course=require('../models/Course');
var users=express.Router();
var Assignment=require('../models/Assignment');
var Solution=require('../models/Solution');

users.route('/')
	//route to get the user
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findById(req.user._id,function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data})
			}
		});
	})
	//remove the user
	.delete(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findByIdAndRemove(req.params.id,function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}else{
				res.json({status:"true",message:data});
			}
		});
	});

	users.route('/all')
	//route to get all users
	.get(function (req,res,next) {
		User.find({},function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data})
			}
		});
	});

	//all expanded record
	users.route('/everything')
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findById(req.user._id).populate({path:'courses',populate:{path:'assignments', populate:{path:'questions'}}}).exec(function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data});
			}
		})
	})


	users.route('/solutions')
	//route to get all solutions submitted by user
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		Solution.find({'user':req.user._id},function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data});
			}
		});
	})
	//route to create a solution
	.post(passport.authenticate('user', { session: false}),function (req,res,next) {
		req.body.user=req.user._id;
		var solution=new Solution(req.body);
		solution.save(function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data});
			}
		});
	});
	
	users.route('/solutions/qsn/:id')
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		Solution.find({'question':req.params.id},function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data});
			}
		});
	});

	users.route('/solutions/:id')
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		Solution.findById(req.params.id,function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}
			else{
				res.json({status:"true",message:data});
			}
		});
	});


	users.route('/courses')
	//add a new course to user's enrolled list of courses.
	.post(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findByIdAndUpdate(req.user._id, { $push: {"courses": req.body._id }},{new:true},function (err,userData){
			if(err){
				res.json({status:false,message:err});
			}else{
				res.send({status:true,message:req.body});
			}
		});
	})
	//get all courses enrolled.
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findById(req.user._id).populate('courses').exec(function (err,userData){
			if(err){
				res.json({status:false,message:err});
			}else{
				res.send({status:true,message:userData.courses});
			}
		});
	});

	users.route('/courses/assignments')
	//get all assignments
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findById(req.user._id).populate({path:'courses',populate:{path:'assignments'}}).exec(function (err,userData){
			if(err){
				res.json({status:false,message:err});
			}else{
				var resData=[];
				for (var i = userData.courses.length - 1; i >= 0; i--) {
					for (var j = userData.courses[i].assignments.length - 1; j >= 0; j--) {
						resData.push(userData.courses[i].assignments[j]);
					}
				}
				res.send({status:true,message:resData});
			}
		});
	});

	users.route('/courses/check/:course')
	.get(function (req,res,next) {
		// body...
	})

	users.route('/courses/:course')
	//get details about a specific course
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		Course.findById(req.params.course).populate('assignments').exec(function (err,userData){
			if(err){
				res.json({status:false,message:err});
			}else{
				res.send({status:true,message:userData});
			}
		});
	})
	//add a new course to user's enrolled list of courses.
	.post(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findByIdAndUpdate(req.user._id, { $push: {"courses": req.params.course }},{new:true},function (err,userData){
			if(err){
				res.json({status:false,message:err});
			}else{
				res.send({status:true,message:userData});
			}
		});
	})
	.delete(passport.authenticate('user', { session: false}),function (req,res,next) {
		User.findByIdAndUpdate(req.user._id, { $pop: {"courses": req.params.course }},{new:true},function (err,userData){
			if(err){
				res.json({status:false,message:err});
			}else{
				res.send({status:true,message:userData});
			}
		});
	});

	users.route('/courses/:course/assignments/:assignment')
	//get details about a specific assignmnet
	.get(passport.authenticate('user', { session: false}),function (req,res,next) {
		Assignment.findById(req.params.assignment).populate('questions').exec(function (err,userData){
			if(err){
				res.json({status:false,message:err});
			}else{
				res.send({status:true,message:userData});
			}
		});
	});

	users.route('/:id')
	//get a specific user. determined by id.
	.get(function (req,res,next) {
		User.findById(req.params.id,function (err,data) {
			if(err){
				res.json({status:"false",message:err});
			}else{
				res.json({status:"true",message:data});
			}
		});
	});
	module.exports = users;