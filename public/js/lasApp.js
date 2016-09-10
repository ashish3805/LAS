/*Main Module
	list all dependent modules here
*/

var auth=angular.module('auth',['$http']);
var app=angular.module("lasApp",['ui.router','auth']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	$stateProvider
		.state('auth',{
			url:'/auth',
			templateUrl:'/templates/signIn.htm',
			controller:'signIn'
		})
		.state('studentDashBoard',{
			url:'/studentDashBoard'

		})
	$urlRouterProvider.otherwise('auth');

}]);

app.controller('homeController',function ($scope){
	$scope.user="ashish";
});


