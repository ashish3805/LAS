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
.service('admin',function ($http) {
	console.log("admin");
	var self = this;
	self.signIn = function (data) {
		return $http.post('/signin/admin',data)
	};
	self.signUp = function (data) {
		return $http.post('/signup/admin',data)
	}
	self.getUser = function () {
		return $http.get('/profile/admin');
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
.controller('signIn',['auth','user','$state','$scope','$window',function (auth,user,$state,$scope,$window) {
	console.log("signIn");
	var self=$scope;
	self.username='';
	self.password='';
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
		console.log(data);
		var status=user.signIn(data);
		status.then(
			function (res) {
				if(res.data.status){
					$window.localStorage['lasUser'] = angular.toJson(res.data.message);
					$state.go('studentDashboard.home');
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
.controller('signUp',['auth','user','$state',"$scope",'$window',function (auth,user,$state,$scope,$window) {
	console.log("signUp");
	var self=$scope;
	self.name=self.password=self.email=self.branch=self.username=self.contact='';
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
					$window.localStorage['lasUser'] = res.data.message;
					reset();
					$state.go('studentDashboard.home');
				}else{
					console.log("err: ",res.data.message);
				}
			},
			function (err) {
				console.log(err);
			}
			);
	};

}])
.controller('signUpAdmin',['auth','admin','$state',"$scope",function (auth,admin,$state,$scope) {
	console.log("signUpAdmin");
	var self=$scope;
	var reset=function () {
		self.name=self.password=self.email=self.dept=self.contact='';
	}
	reset();
	self.submit=function () {
		var data = {
			name:self.name,
			password:self.password,
			dept:self.dept,
			email:self.email,
			contact:self.contact
		};
		var status=admin.signUp(data);
		status.then(
			function (res) {
				if(res.data.status){
					$window.localStorage['lasUser'] = res.data.message;
					console.log(res.data);
					reset();
					$state.go('adminDashboard.home');
				}else{
					console.log("err: ",res.data.message);
				}
			},
			function (err) {
				console.log(err);
			});
	};

}])
.controller('signInAdmin',['auth','admin','$state','$scope','$window',function (auth,admin,$state,$scope,$window) {
	console.log("signIn");
	var self=$scope;
	var reset=function () {
		self.email='';
		self.password='';
	}
	reset();
	self.submit=function () {
		console.log("clicked",self.email,self.password);
		var data={
			email:self.email,
			password:self.password
		};
		var status=admin.signIn(data);
		status.then(
			function (res) {
				if(res.data.status){
					$window.localStorage['lasUser'] = res.data.message;
					$state.go('adminDashboard.home');
				}
				else{
					console.log("login error",res.data.message);
				}
			},
			function (err) {
				console.log(err);
			});
	}
}]);


