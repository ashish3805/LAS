
var assignment=angular.module('assignmentModule');
assignment
.controller('assignmentCtrl',['$scope','$stateParams','user','auth','assignmentSrv',function ($scope,$stateParams,user,auth,assignment,$http) {
    var self=$scope;
    self.course=$stateParams.course;
    console.log("course: ",course)
    self.assignments=[];
    var logError=function (err) {
        console.log("Error: "+err);
    };

    self.resetAssignmentForm=function () {
        self.data={
            title:'',
            desc:'',
            due:''
        }
    };
    self.createAssignment=function () {
        assignment.createAssignment(self.course,self.data).then(function (res) {
            if(res.data.status){
                console.log(res.data);
                self.assignments.push(res.data.message);
                self.data.title=self.data.desc=self.data.due="";
            }else{
                console.log(res.data);
            }
        },logError);
    };
    self.deleteAssignment=function (c_id) {
        assignment.deleteAssignment(self.course,c_id).then(function (res) {
            if(res.data.status){
                console.log(res.data.message);
                var removeIndex = self.assignments.map(function(item) { return item._id; })
                .indexOf(c_id);
                ~removeIndex && self.assignments.splice(removeIndex, 1);
            }else{
                console.log(res.data.message);
            }
        },logError);
    };
    self.getAssignment=function (c_id) {
        assignment.getAssignment(self.course,c_id).then(function (res) {
            if(res.data.status){
                console.log(res.data.message);
                self.assignments.remove(res.data.message);
            }else{
                console.log(res.data.message);
            }
        },logError);
    };
    self.getAllAssignments=function () {
        assignment.getAllAssignments(self.course).then(function (res) {
            if(res.data.status){
                console.log(res.data.message);
                angular.copy(res.data.message, self.assignments);
            }else{
                console.log(res.data.message);
            }
        },logError);
    };

    //initialise course list
    self.resetAssignmentForm();
    self.getAllAssignments();

}])
.service('assignmentSrv',function ($http) {
    var self= this;
    self.createAssignment=function (course,data) {
        return $http.post("/courses/"+course+"/assignments",data);
    }
    self.getAssignment=function (course,c_id) {
        return $http.get("/courses/"+course+"/assignments/"+c_id);
    }
    self.getAllAssignments=function (course) {
        return $http.get("/courses/"+course+"/assignments");
    }
    self.deleteAssignment=function (course,c_id) {
        return $http.delete("/courses/"+course+"/assignments/"+c_id);
    }
    self.userAssignmentsAll=function ( ){
        return $http.get("/courses/123"+"/assignments/"+"all");
    }
})
.controller('assignmentCtrlAll',['$scope','user','auth','assignmentSrv',function ($scope,user,auth,assignment) {
    console.log("all init");
        var logError=function (err) {
        console.log("Error: "+err);
    };
    var self=$scope;
    self.assignmentsAll=[];
    self.userAssignmentsAll=function () {
        assignment.userAssignmentsAll().then(function (res) {
            if(res.data.status){
                console.log(res.data.message);
                angular.copy(res.data.message, self.assignmentsAll);
                console.log(self.assignmentsAll);
            }else{
                console.log(res.data.message);
            }
        },logError);
    }
    self.userAssignmentsAll();
}]);
