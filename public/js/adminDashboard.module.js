var adminDashboard = angular.module('adminDashboard');

adminDashboard
	.controller('adminCtrl',['$scope','admin','auth',function ($scope,admin,auth) {
		var self=$scope;
		self.admin={};
		if(auth.isAuthed()){
			admin.getUser().then(function (res) {
				console.log(res.data.message);
				angular.copy(res.data.message,self.admin);
			},function (err) {
				console.log("error");
			});
		}else{
			console.log("please log in");
		}
	}]);
