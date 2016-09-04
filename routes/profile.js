var express=require('express');
var router=express.Router();

router.route('/')
	.get(function (req,res) {
		res.send('got a get request');
		
	})
	.put(function (req,res) {
		res.send('got a put request');
	})
module.exports=router;