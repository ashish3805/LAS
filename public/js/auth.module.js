var authModule=angular.module('authModule');
authModule
.service('auth',function ($window){
	console.log("auth");
	var self=this;
	self.parseJwt = function(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse($window.atob(base64));
	}
	self.saveToken = function(token) {
		$window.localStorage['jwtToken'] = token;
	}
	self.getToken = function() {
		return $window.localStorage['jwtToken'];
	}
	self.isAuthed = function() {
		var token = self.getToken();
		if(token) {
			var params = self.parseJwt(token);
			return Math.round(new Date().getTime() / 1000) <= params.exp;
		} else {
			return false;
		}
	}
	self.logout = function() {
		$window.localStorage.removeItem('jwtToken');
	}
})
.service('user',function ($http) {
	console.log("user");
	var self = this;
	self.signIn = function (data) {
		return $http.post('/signin',data)
	};
	self.signUp = function (data) {
		return $http.post('/signup',data)
	}
	self.getUser = function () {
		return $http.get('/profile');
	}
})
.factory('authInterceptor',['$injector',function ($injector) {
	console.log("inter");
	return {
    // automatically attach Authorization header
    request: function(config) {
    	var token = $injector.get('auth').getToken();
    	if(token) {
    		config.headers.Authorization = 'JWT ' + token;
    	}
    	return config;
    },
    // If a token was sent back, save it
    response: function(res) {
    	if(res.data.token) {
    		$injector.get('auth').saveToken(res.data.token);
    	}

    	return res;
    }
}
}])
.controller('signIn',['auth','user','$state','$scope',function (auth,user,$state,$scope) {
	console.log("signIn");
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
		var status=user.signIn(data);
		status.then(
			function (res) {
				if(res.data.status){
					$state.go('studentDashboard');
				}
				else{
					console.log("login error",res.data.message);
				}
			},
			function (err) {
				console.log(err);
			});
	}
}])
.config(function ($httpProvider) {
	console.log("config");
	$httpProvider.interceptors.push('authInterceptor');
})
.controller('signUp',['auth','user','$state',"$scope",function (auth,user,$state,$scope) {
	console.log("signUp");
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
		var status=user.signUp(data);
		status.then(
			function (res) {
				if(res.data.status){
					reset();
					$state.go('studentDashboard');
				}else{
					console.log("err: ",res.data.message);
				}
			},
			function (err) {
				console.log(err);
			}
			);
	};

}]);
