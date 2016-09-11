var auth=angular.module('auth');
auth.factory('authService',function ($http){
	var signIn = function (username,password) {
		var config={
			headers:{
				username:username,
				password:password
			}
		};
		return $http.get('/auth',config)
	};
	var signUp = function (data) {
		return $http.post('/auth',data)
	}
	return {
		signUp:signUp,
		signIn:signIn
	}
})
.controller('signIn',['authService','$scope',function (authService,$scope) {
	var self=$scope;
	var reset=function () {
		self.username='';
		self.password='';
	}
	reset();
	self.submit=function () {
		console.log("clicked",self.username,self.password);
		var status=authService.signIn(self.password,self.username);
		status.then(
			function (data) {
				console.log(data);
				reset();
			},
			function (err) {
				console.log(err);
			});
	}
}])
.controller('signUp',['authService',"$scope",function (authService,$scope) {
	var self=$scope;
	var reset=function () {
		self.name=self.password=self.email=self.branch=self.enrollment=self.contact='';
	}
	reset();
	var data = {
		name:self.name,
		enrollment:self.enrollment,
		password:self.password,
		branch:self.branch,
		email:self.email,
		contact:self.contact
	};

	var signUp=authService.signUp(data);
	signUp.then(
		function (res) {
			console.log(res.data);
			reset();
		},
		function (err) {
			console.log(err);
		});
}]);
