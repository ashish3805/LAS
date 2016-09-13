/*Main Module
list all dependent modules here
*/
angular.module('authModule',[]);
angular.module('studentDashboard',['authModule']);
var app=angular.module("lasApp",['ui.router','authModule','studentDashboard']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	console.log("here");
	$stateProvider
	.state('signIn',{
		url:'/signIn',
		templateUrl:'/templates/signIn.htm',
		controller:'signIn'
	})
	.state('signUp',{
		url:'/signUp',
		templateUrl:'/templates/signUp.htm',
		controller:'signUp'
	})
	.state('studentDashboard',{
		url:'/studentDashboard',
		templateUrl:'/templates/studentDashboard.htm',
		controller:'student'
	});
	$urlRouterProvider.otherwise('signIn');
}]).controller('homeController',function ($scope){
	$scope.user="ashish";
});
