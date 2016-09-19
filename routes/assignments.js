var express=require('express');
var Assignment=require('../models/Assignment');
var assignments=express.Router({mergeParams: true});
var passport=require('../config/passport');
var Admin=require('../models/Admin');
var Course=require('../models/Course');
var questions=require('./questions');

assignments.use('/:assignment/questions',questions);

assignments.route('/')
.post(function (req,res) {
  var ass=Assignment(req.body);
  ass.save(function (err,data) {
    if(err){
      res.json({status:false,message:err});
    }else{
      Course.findByIdAndUpdate(req.params.course, { $push: {"assignments": data._id }},{new:true},function (err,assData){
        if(err){
            //console.log(err);
            res.json({status:false,message:err});
          }else{
            res.json({status:true,message:data});
          }
        });
    }
  });
})
.get(function (req,res) {
  Course.findById(req.params.course).populate('assignments').exec(function (err,data){
    if(err){
      res.json({status:false,message:err});
    }else{
      res.json({status:true,message:data.assignments});
    }
  });
});

assignments.route('/all')
.get(passport.authenticate('admin', { session: false}),function (req,res) {
  Admin.findById(req.user._id).populate({path:'courses',populate:{path:'assignments'}}).exec(function (err,data) {
    var assData=[];
    if(err){
      res.json({status:false,message:err});
    }else{
      data.courses.forEach(function (course) {
        course.assignments.forEach(function (ass){
          assData.push(ass);
        })
      });
      res.json({status:true,message:assData});
    };
  })
});



  assignments.route('/:id')
  .put(function (req,res) {
    console.log('put');
    res.send("put");
  })
  .delete(function (req,res) {
    console.log('delete');
    Assignment.findByIdAndRemove(req.params.id, function (err,data) {
      if(err){
        res.json({status:false,message:err});
      }else{
        res.send({status:true,message:data});
      }
    });
  })
  .get(function (req,res) {
    Assignment.findById(req.params.id,function (err,data){
      if(err){
        res.json({status:false,message:err});
      }else{
        res.json({status:true,message:data});
      }
    });
  }); 	


  module.exports=assignments;