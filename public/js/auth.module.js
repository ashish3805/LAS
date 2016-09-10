auth.factory('authService',['$http',function ($http){
		var status = function (username,password) {
						var config={
							headers:{
								username:username,
								password:password
							}
						};
						return $http.get('/auth',config)
					};
		return {
			getStatus:status
			}
	}])
	.controller('signIn',['authService',function (authService) {
		var self=this;
		self.username='';
		self.password='';
		self.submit=function () {
			var status=authService.getStatus(username,password);
			status.then(
			function (data) {
				console.log(data);
			},
			function (err) {
				console.log(err);
			});
		}
	}])
	.controller('signUp',function () {
		var self=this;
		self.name=self.password=self.email=self.branch=self.enrollment='';
	});
