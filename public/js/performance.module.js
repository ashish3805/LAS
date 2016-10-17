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
				var courseData;
				self.scoreMap=utility.mapSolns(res.data.message);
				drawGraph(utility.evalCourse(self.course.assignments,self.scoreMap));
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
		datasetOverride : [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
		labels:[],
		data:[]
	};
	var drawGraph=function (data) {
		console.log(data);
		self.graph.labels=[];
		self.graph.data=[];
		for (var i = 0; i < data.length; i++) {
			self.graph.labels.push(data[i].name);
			self.graph.data.push(data[i].percentage);
		}
		self.graph.series=['Assignment'];
	};
	self.getPerf=function (course) {
		drawGraph(utility.evalCourse(course.assignments,self.scoreMap));
	};
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
			console.log("dataEVAL ",scoreMap)
			for (var i = 0;i < assignments[j].questions.length; i++) {
				if(scoreMap[assignments[j].questions[i]]!=undefined){
					//console.log("doing");
					data.score +=scoreMap[assignments[j].questions[i]];
					data.marks +=assignments[j].questions[i].marks;
				};
			};
			if(data.marks) {
				data.percentage=(data.score/data.marks)*100
			}
			ass.push(data);
		}
		return ass;

	}
	self.mapSolns=function (solns) {
		var scoreMap={};
		//console.log(solns);
		//console.log("map","   here ",scoreMap);
		for (var i = 0; i < solns.length; i++) {
			//console.log("map",i,"   here ",scoreMap);
			if(solns[i].status && scoreMap[solns[i].question]){
				if(scoreMap[solns[i].question]<solns[i].score){
					scoreMap[solns[i].question]=solns[i].score
				}
			}else if(solns[i].status) {
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