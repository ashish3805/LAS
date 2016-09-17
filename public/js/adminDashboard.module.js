var adminDashboard = angular.module('adminDashboard');

studentDashboard
	.controller('admin',['$scope','user','auth',function ($scope,user,auth) {
		var self=$scope;
		self.user="";
		if(auth.isAuthed()){
			user.getUser().then(function (res) {
				console.log(res.data.username);
				self.user=res.data.name;
			},function (err) {
				console.log("error");
			});
		}else{
			console.log("please log in");
		}
	}])
	.controller('courses',['$scope','user','auth',function ($scope,user,auth) {
		var self=$scope;
		self.courseName="";
		data={
			name:self.courseName
		}
		
	}])

