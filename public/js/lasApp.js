/*Main Module
list all dependent modules here
*/
angular.module('authModule',[]);
var app=angular.module("lasApp",['ui.router','authModule']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider,$httpProvider) {
	$stateProvider
	.state('auth',{
		url:'/auth',
		templateUrl:'/templates/signIn.htm',
		controller:'signIn'
	})
	.state('signUp',{
		url:'/signUp',
		templateUrl:'/templates/signUp.htm',
		controller:'signUp'
	});
	$urlRouterProvider.otherwise('auth');
}]).controller('homeController',function ($scope){
	$scope.user="ashish";
});
