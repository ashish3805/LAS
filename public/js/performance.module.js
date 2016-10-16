var performance=angular.module('performanceModule');

performance
.controller("perfCtrlStu",['$scope','solutionSrv','utility','courseStuSrv','perfSrvStu',function ($scope,soln,utility,courseSrv,perfSrv) {
	var self=$scope;
	self.courses=[];
	self.course='';
	perfSrv.getEverything().then(function (res) {
		if(res.data.status){
			self.course=res.data.message.courses[0];
			angular.copy(res.data.message.courses,self.courses);
			getAllSoln();
			console.log(self.courseData);
		}else{
			console.log(res.data.message);
		}
	},function (err) {
		console.log(err);
	});
	
	var getAllSoln=function () {
		soln.fetchAllSoln().then(function (res) {
			if(res.data.status){
				self.scoreMap=utility.mapSolns(res.data.message);
				console.log("loggign course",self.course)
				angular.copy(utility.evalCourse(self.course.assignments,self.scoreMap),self.courseData);
				drawGraph(courseData);
			}else{
				console.log(res.data.message)
			}
		},function () {
			console.log(err);
		});	
	};

	self.graph={
		options : {
			scales: {
				yAxes: [
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				},
				{
					id: 'y-axis-2',
					type: 'linear',
					display: true,
					position: 'right'
				}
				]
			}
		},
		datasetOverride : [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }]
	};
	var drawGraph=function (data) {
		self.graph.labels=utility.extractAssignmentNames(course);
		self.graph.data=[[65, 59, 80, 81, 56, 55, 40],[6, 5, 8, 8, 5, 5, 0]];
		self.graph.series=['Assignemnt',"ass"];
	}
	self.getPerf=function (course) {
		self.graph.course=course;

	}
	self.onClick = function (points, evt) {
		console.log(points, evt);
	};
}])
.service('perfSrvStu',function ($http) {
	var self=this;
	self.getEverything=function () {
		return $http.get('/users/everything');
	};
})
.service('utility',function ($http) {
	var self=this;
	self.extractCourses=function () {
		// body...
	};
	self.evalCourse=function (assignments,scoreMap) {
		var ass=[];
		for (var j = 0; j < assignments.length; j++) {
			var data={
				name:'',
				score:0,
				marks:0,
				percentage:0
			};
			data.name=assignments[j].title;
			for (var i = 0; i < assignments[j].questions.length; i++) {
				data.score+=scoreMap[assignments[j].questions[i]];
				data.marks+=assignments[j].questions[i].marks;
			}
			data.percentage=(data.score/data.marks)*100;
			ass.push(data);
		}
		return ass;

	}
	self.mapSolns=function (solns) {
		var scoreMap={};
		for (var i = 0; i < solns.length; i++) {
			if(scoreMap[solns[i].question]){
				if(scoreMap[solns[i].question]<solns[i].score){
					scoreMap[solns[i].question]=solns[i].score
				}
			}else{
				scoreMap[solns[i].question]=solns[i].score;
			}
		}
		return scoreMap;
	}
	self.extractAssignmentNames=function (course) {
		var list=[];
		for (var i = 0; i < course.assignments.length; i++) {
			list.push(course.assignments[i].title);
		}
		return list;
	}
	self.marksTotal=function (assignment) {
		var sum=0;
		for (var i = 0; i < assignment.questions.length; i++) {
			sum+=assignment.questions[i].marks;
		}
	}
})