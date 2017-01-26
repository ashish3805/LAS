var express=require('express');
var Solution=require('../models/Solution');
var solutions=express.Router({mergeParams: true});
var passport=require('../config/passport');
var Admin=require('../models/Admin');

solutions.route('/')
//get all solutions to a question.
.get(passport.authenticate('admin', { session: false}),function (req,res) {
	Solution.find({'question':req.params.id}).populate('user').exec(function (err,data) {
		if(err){
			res.json({status:false,message:err});
		}else{
			res.json({status:true,message:data});
		}
	})
});


solutions.route('/:sol')
//update the score for the problem
.put(passport.authenticate('admin', { session: false}),function (req,res) {
			var score=req.body.score;
			//console.log(res.body);
			Solution.findByIdAndUpdate(req.params.sol, { 'score':score, 'status':true},{new:true},function (err,data){
					if(err){
						res.json({status:false,message:err});
					}else{
						res.send({status:true,message:data});
					}
			});
})
//get a particular solution
.get(passport.authenticate('admin', { session: false}),function (req,res) {
		Solution.findById(req.params.sol).populate('user').populate('question').exec(function (err,data) {
		if(err){
			res.json({status:false,message:err});
		}else{
			res.json({status:true,message:data});
		}
	});
});

module.exports=solutions;