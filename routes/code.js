var express=require('express');
var router=express.Router();
var exec = require('child_process').exec;
var fs = require('fs');

function compile(code,input,callback){
	fs.writeFile("code.c", code, ['utf-8'], function(){
		fs.writeFile("input", input, ['utf-8'], function(){
			var cmd = 'gcc code.c';
			exec(cmd, function(error, stdout, stderr) {
				if(error)
					callback(error, stdout, stderr);
				else{
					exec('a.exe < input',function(error, stdout, stderr){
						callback(error,stdout,stderr);
					});
				}
			});
		});
	});
};

router.post('/',function (req,res) {
console.log(req.body);
    compile(req.body.code,req.body.input,function(error, stdout, stderr){
    	var result={};
  		result.stdout=stdout;
  		result.stderr=stderr;
  		if(result.stderr==''){
    		res.json({status:true, message:stdout});
  		}
  		else{
    		res.json({status:false, message:stderr});
  		}
    	console.log(result);
    });
})
module.exports=router;