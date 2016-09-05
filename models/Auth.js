var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var userSchema= new Schema({
	name:String,
	password:String,
	year:Number,
	desc:String
});

userSchema.methods.getClassmates= function(cb){
	this.model('User').find({year: 3},cb);
};

var User=mongoose.model('User',userSchema);

//tests
var apurva= new User({
	name:'apurva',
	password:'12345',
	year:3,
	desc:"blah"
});
apurva.save(function (err,user) {
	if (err) {
		console.log(err);
	}else{
		//console.log(user);
	}
});
var ashish= new User({
	name:'ashish',
	password:'54321',
	year:3,
	desc:"blah!!"
});
var ananya= new User({
	name:'ananya',
	password:'321',
	year:2,
	desc:"blah!!---"
});
ashish.save(function (err,user) {
	if (err) {
		console.log(err);
	}else{
		//console.log(user);
	}
});
ananya.save(function (err,user) {
	if (err) {
		console.log(err);
	}
	else{
		apurva.getClassmates(function (err,classmates) {
			if(err){
				console.log(err);
			}else{
				console.log("found some classmates:"+classmates);
			}
		});
	}
});


