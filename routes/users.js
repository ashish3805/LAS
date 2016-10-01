var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('got a get request');
});

course.use('/:course/assignments',assignments);
user.route('/course')
.post(passport.authenticate('user', { session: false}),function (req,res) {
	var course=Course(req.body);
	course.save(function (err,data) {
		if(err){
			
			res.json({status:false,message:err});
		}else{
			
			User.findByIdAndUpdate(req.user._id, { $push: {"courses": data._id }},{new:true},function (err,userData){
					if(err){
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
	User.findById(req.user._id).populate('courses').exec(function (err,data) {
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
			Admin.findByIdAndUpdate(req.user._id,{ $pop: {"courses": req.params.id }},{new:true}, function (err,data) {
				if(err){
					console.log(err);
					res.json({status:false,message:err});
				}else{
					console.log(data);
					res.send({status:true,message:data});
				}
			});
		}
	});
})
.get(function (req,res) {
	console.log("get "+req.params.id);
	Course.findById(req.params.id).populate({path:'assignments'}).exec(function (err,data) {
		if(err){
			console.log(err);
			res.json({status:false,message:err});
		}else{
			console.log(data);
			res.send({status:true,message:data});
		}
	});
});

course.route('/all')
.get(function (req,res,next){
	Course.find({},function (err,data) {
		if(err){
			console.log(err);
			res.json({status:false,message:err});
		}else{
			console.log(data);
			res.send({status:true,message:data});
		}
	});
});

course.route('/student')
.get(passport.authenticate('user', { session: false}),function (req,res,next){
	User.findById(rq.user._id).populate({path:'courses'}).exec(function (err,data) {
		if(err){
			console.log(err);
			res.json({status:false,message:err});
		}else{
			console.log(data);
			res.send({status:true,message:data.courses});
		}
	});
})
.post(passport.authenticate('user', { session: false}),function (req,res,next){
	User.findByIdAndUpdate(req.user._id, { $push: {"courses": req.body.course }},{new:true},function (err,userData){
					if(err){
						res.json({status:false,message:err});
					}else{
						res.send({status:true,message:req.body});
					}
			});
});

course.route('/student/:id')
.delete(passport.authenticate('user', { session: false}),function (req,res) {
	console.log("delete  ", req.params.id);
	User.findByIdAndUpdate(req.user._id,{ $pop: {"courses": req.params.id }},{new:true}, function (err,data) {
		if(err){
			console.log(err);
			res.json({status:false,message:err});
		}else{
			console.log(data);
			res.send({status:true,message:data});
		}
	});
});

module.exports = router;
