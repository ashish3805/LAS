var studentDashboard = angular.module('studentDashboard');

studentDashboard
.controller('studentCtrl',['$scope','user','auth','$state','$window',function ($scope,user,auth,$state,$window) {
	var self=$scope;
	self.user={};
	if(auth.isAuthed()){
		console.log("authed");
		if($window.localStorage['lasUser']){
			console.log("copied from local",JSON.parse($window.localStorage['lasUser']));
			angular.copy(JSON.parse($window.localStorage['lasUser']),self.user);
		}else{
			user.getUser().then(function (res) {
				console.log("copied from server");
				$window.localStorage['lasUser'] = res.data.message;
				console.log(res.data);
				angular.copy(res.data.message,self.user);
			},function (err) {
				$state.go('signIn');
			});
		}
	}else{
		console.log("not authed");
		$state.go('signIn');
	}
}]);

