var express=require('express');
var passport=require('../config/passport');
var router=express.Router();

router.route('/')
	.post(passport.signin);
module.exports=router;