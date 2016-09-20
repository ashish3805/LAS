var express=require('express');
var Question=require('../models/Question');
var questions=express.Router({mergeParams: true});
var passport=require('../config/passport');
var Admin=require('../models/Admin');
var Course=require('../models/Course');
var Assignment=require('../models/Assignment');

questions.route('/')
.post(function (req,res) {

	var question=Question(req.body);
	question.save(req.body, function (err,data) {
		if(err){
			res.json({status:false,message:err});
		}else{
			Assignment.findByIdAndUpdate(req.params.assignment, { $push: {"questions": data._id }},{new:true},function (err,assData){
				if(err){
					res.json({status:false,message:err});
				}else{
					res.json({status:true,message:data});
				}		
			});
		}
	})
})

.get(function (req,res) {
  Assignment.findById(req.params.assignment).populate('questions').exec(function (err,data){
    if(err){
      res.json({status:false,message:err});
    }else{
      res.json({status:true,message:data.questions});
    }
  });
});

questions.route('/all')
.get(passport.authenticate('admin', { session: false}),function (req,res) {
  Admin.findById(req.user._id).populate({path:'courses',populate:{path:'assignments',populate:{path:'questions'}}}).exec(function (err,data) {
    var qsnData=[];
    if(err){
      res.json({status:false,message:err});
    }else{
      data.courses.forEach(function (course) {
        course.assignments.forEach(function (ass){
          ass.questions.forEach(function (qsn) {
          	qsnData.push(qsn);
          });
        });
      });
      res.json({status:true,message:qsnData});
    };
  })
});

questions.route('/:id')
.put(function (req,res) {
	console.log("put");
	res.send("put");
})
.get(function (req,res) {
    Question.findById(req.params.id,function (err,data){
      if(err){
        res.json({status:false,message:err});
      }else{
        res.json({status:true,message:data});
      }
    });
})
.delete(function (req,res) {
    console.log('delete');
    Question.findByIdAndRemove(req.params.id, function (err,data) {
      if(err){
        res.json({status:false,message:err});
      }else{
        res.send({status:true,message:data});
      }
    });
});
module.exports=questions;
