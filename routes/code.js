var express=require('express');
var router=express.Router();

router.post('/',function (req,res) {
	res.send('got a post');
})
module.exports=router;