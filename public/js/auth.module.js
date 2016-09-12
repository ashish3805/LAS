var auth=angular.module('auth');
auth.factory('authService',function ($http){
	var signIn = function (data) {
		return $http.post('/signin',data)
	};
	var signUp = function (data) {
		return $http.post('/signup',data)
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
		var data={
			username:self.username,
			password:self.password
		};
		var status=authService.signIn(data);
		status.then(
			function (res) {
				console.log(res.data);
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
		self.name=self.password=self.email=self.branch=self.username=self.contact='';
	}
	reset();
	self.submit=function () {
		var data = {
			name:self.name,
			username:self.username,
			password:self.password,
			branch:self.branch,
			email:self.email,
			contact:self.contact
		};
		var status=authService.signUp(data);
		status.then(
			function (res) {
				console.log(res.data);
				reset();
			},
			function (err) {
				console.log(err);
			}
			);
	};

}]);
