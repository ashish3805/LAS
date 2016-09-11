/*Main Module
list all dependent modules here
*/
angular.module('auth',[]);
var app=angular.module("lasApp",['ui.router','auth']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
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
