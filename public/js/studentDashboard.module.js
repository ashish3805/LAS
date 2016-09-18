var studentDashboard = angular.module('studentDashboard');

studentDashboard
	.controller('student',['$scope','user','auth',function ($scope,user,auth) {
		var self=$scope;
		self.user={};
		if(auth.isAuthed()){
			user.getUser().then(function (res) {
				console.log(res.data);
				self.user=res.data.message;
			},function (err) {
				console.log("error");
			});
		}else{
			console.log("please log in");
		}
	}]);

