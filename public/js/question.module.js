
var question=angular.module('questionModule');
question
.controller('questionCtrl',['$scope','$stateParams','user','auth','questionSrv',function ($scope,$stateParams,user,auth,question,$http) {
    var self=$scope;
    self.course=$stateParams.course;
    if(self.course=='')
        self.course=123;
    self.assignment=$stateParams.assignment;
    self.questions=[];
    var logError=function (err) {
        console.log("Error: "+err);
    };

    self.resetQuestionForm=function () {
        self.data={
            number:'',
            marks:'',
            desc:''
        }
    };
    self.createQuestion=function () {
        question.createQuestion(self.course,self.assignment,self.data).then(function (res) {
            if(res.data.status){
                console.log(res.data);
                self.questions.push(res.data.message);
                self.data.marks=self.data.number=self.data.desc="";
            }else{
                console.log(res.data);
            }
        },logError);
    };
    self.deleteQuestion=function (c_id) {
        question.deleteQuestion(self.course,self.assignment,c_id).then(function (res) {
            if(res.data.status){
                console.log(res.data.message);
                var removeIndex = self.questions.map(function(item) { return item._id; })
                       .indexOf(c_id);
                       ~removeIndex && self.questions.splice(removeIndex, 1);
            }else{
                console.log(res.data.message);
            }
        },logError);
    };
    self.getQuestion=function (c_id) {
        question.getQuestion(self.course,self.assignment,c_id).then(function (res) {
            if(res.data.status){
                console.log(res.data.message);
                self.questions.remove(res.data.message);
            }else{
                console.log(res.data.message);
            }
        },logError);
    };
    self.getAllQuestions=function () {
        question.getAllQuestions(self.course,self.assignment).then(function (res) {
            if(res.data.status){
                console.log(res.data.message);
                angular.copy(res.data.message, self.questions);
            }else{
                console.log(res.data.message);
            }
        },logError);
    };

    //initialise course list
    self.resetQuestionForm();
    self.getAllQuestions();

}])
.service('questionSrv',function ($http) {
    var self= this;
    self.createQuestion=function (course,assignment,data) {
        return $http.post("/courses/"+course+"/assignments/"+assignment+"/questions/",data);
    }
    self.getQuestion=function (course,assignment,c_id) {
        return $http.get("/courses/"+course+"/assignments/"+assignment+"/questions/"+c_id);
    }
    self.getAllQuestions=function (course,assignment) {
        return $http.get("/courses/"+course+"/assignments/"+assignment+"/questions/");
    }
    self.deleteQuestion=function (course,assignment,c_id) {
        return $http.delete("/courses/"+course+"/assignments/"+assignment+"/questions/"+c_id);
    }
});
