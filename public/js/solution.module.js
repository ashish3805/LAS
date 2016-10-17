var solution=angular.module('solutionModule');

solution
.controller('solutionCreateCtrl',['$scope','$stateParams','$window','solutionSrv',function ($scope,$stateParams,$window,solutionSrv) {
	var self=$scope;
    self.question=$stateParams.question;
    self.response='';
    $scope.aceLoaded = function(_editor){
    	// Editor part
    	var _session = _editor.getSession();
    	var _renderer = _editor.renderer;
    	//var _mode=_session.setMode("ace/mode/c_cpp");
    	if($window.localStorage['solution']){
    		_editor.setValue($window.localStorage['solution']);
    	}

    	// Options
    	_editor.setReadOnly(false);
    	_session.setUndoManager(new ace.UndoManager());
    	_renderer.setShowGutter(true);

    	// Events
    	_editor.on("changeSession", function(){ });
    	_session.on("change", function(){ 
    		$window.localStorage['solution']=_editor.getValue();
    	});
    	$scope.submit=function () {
            self.response='';
            var data={
             content: _editor.getValue(),
             question:self.question,
             status:false
         }
         solutionSrv.create(data).then(function (res) {
            if(res.data.status){
                self.response='solution submitted successfully!';
                self.resStatus=true;
                self.solutions.push(res.data.message);
                console.log("solutions child",self.solutions);
            }else{
                self.response='There was a problem submittoing solution!';
                self.resStatus=false;
            }
        },function (err) {
            self.response='There was a problem submittoing solution!';
            self.resStatus=false;
        });
     }
     $scope.reset=function () {
      _editor.setValue("");
  }
};
}])
.controller('solutionCtrl',['$scope','$stateParams','$window','solutionSrv',function ($scope,$stateParams,$window,solutionSrv) {
    var self=$scope;
    self.question=$stateParams.question;

    self.solutions=[];
    var getQsnSolutions=function () {
        solutionSrv.fetchQsnSoln(self.question).then(function (res) {
            if(res.data.status){
                angular.copy(res.data.message,self.solutions);
            }else{
                console.log(res.data.message);
            }
        },function (err) {
            console.log(err);
        })
    }
    getQsnSolutions();
}])
.controller('viewSolnCtrl',['$scope','$stateParams','$window','solutionSrv',function ($scope,$stateParams,$window,solutionSrv) {
    var self=$scope;
    self.response='';

    $scope.aceLoaded = function(_editor){
        // Editor part
        var _session = _editor.getSession();
        var _renderer = _editor.renderer;
        //var _mode=_session.setMode("ace/mode/c_cpp");
        if($window.localStorage['solution']){
            _editor.setValue($window.localStorage['solution']);
        }
        console.log($stateParams);
        solutionSrv.fetchSoln($stateParams.solution).then(function (res) {
            if(res.data.status){
                console.log(res.data.message)
                _editor.setValue(res.data.message.content);
            }else{
                _editor.setValue(res.data.message);
            }
        },function (err) {
            _editor.setValue(err);
        });
        // Options
        _editor.setReadOnly(true);
        _session.setUndoManager(new ace.UndoManager());
        _renderer.setShowGutter(true);

        // Events
        _editor.on("changeSession", function(){ });
        _session.on("change", function(){ 
        });
    };
}])
.controller('viewSolnCtrlAdmin',['$scope','$stateParams','$window','solutionSrvAdmin',function ($scope,$stateParams,$window,solutionSrv) {
    var self=$scope;
    self.response='';
    self.marks='';
    self._editor='';
    $scope.aceLoaded = function(_editor){
        // Editor part
        var _session = _editor.getSession();
        var _renderer = _editor.renderer;
        //var _mode=_session.setMode("ace/mode/c_cpp");
        if($window.localStorage['solution']){
            _editor.setValue($window.localStorage['solution']);
        }
        console.log($stateParams);
        solutionSrv.fetchSoln($stateParams.solution).then(function (res) {
            if(res.data.status){
                console.log(res.data.message)
                _editor.setValue(res.data.message.content);
                self.marks=res.data.message.question.marks;
            }else{
                _editor.setValue(res.data.message);
            }
        },function (err) {
            _editor.setValue(err);
        });
        // Options
        _editor.setReadOnly(true);
        _session.setUndoManager(new ace.UndoManager());
        _renderer.setShowGutter(true);

        // Events
        _editor.on("changeSession", function(){ });
        _session.on("change", function(){ 
        });
        self._editor=_editor;
    };
}])
.service('solutionSrv',function ($http) {
	var self= this;
	self.create=function (data) {
		return $http.post("/users/solutions",data);
	};
    self.fetchSoln=function (data) {
        return $http.get("/users/solutions/"+data   );
    };
    self.fetchQsnSoln=function (data) {
        return $http.get("/users/solutions/qsn/"+data)
    }
    self.fetchAllSoln=function (data) {
        return $http.get("/users/solutions");
    }
})
.service('solutionSrvAdmin',function ($http) {
    var self= this;
    self.fetchSoln=function (sol) {
        return $http.get("courses/123/assignments/123/questions/123/solutions/"+sol);
    };
    self.fetchQsnSoln=function (data) {
        return $http.get("courses/123/assignments/123/questions/"+data+"/solutions/");
    }
    self.updateScore=function (sol,score) {
        return $http.put("courses/123/assignments/123/questions/123/solutions/"+sol,score);
    }
})
.controller('solutionCtrlAdmin',['$scope','$stateParams','$window','solutionSrvAdmin',function ($scope,$stateParams,$window,solutionSrv) {
    var self=$scope;
    self.question=$stateParams.question;

    self.solutions=[];
    var getQsnSolutions=function () {
        solutionSrv.fetchQsnSoln(self.question).then(function (res) {
            if(res.data.status){
                angular.copy(res.data.message,self.solutions);
            }else{
                console.log(res.data.message);
            }
        },function (err) {
            console.log(err);
        })
    }
    getQsnSolutions();
}])
.controller('checkSolnCtrl',['code','questionSrv','$scope','$stateParams','$window','solutionSrvAdmin',function (code,qsnSrv,$scope,$stateParams,$window,solutionSrv) {
    var self=$scope;
    self.question=$stateParams.question;
    self.response='';
    self.resStatus=false;
    self.marks='';
    self.score=0;
    console.log($stateParams);
    solutionSrv.fetchSoln($stateParams.solution).then(function (res) {
        if(res.data.status){
            setMarks(res);
        }else{
            console.log(res)
        }
    },function (err) {
    });
    var setMarks=function (res) {
        qsnSrv.getQuestion(123,123,res.data.message.question[0]._id).then(function (res) {
            if(res.data.message){
                self.marks=res.data.message.marks;
                console.log("done got qsn",res.data.message);
            }else{
                console.log(res.data.message);
            }
        },function (err) {
            console.log(err);
        });
    };
    self.setScore=function () {
        if(self.score>self.marks){
            self.resStatus=true;
            self.response="Score must be less than Max Marks";
        }else{
            self.resStatus=false;
            solutionSrv.updateScore($stateParams.solution,{score:self.score}).then(function (res) {
                if(res.data.status){
                    self.resStatus=true;
                    self.response='score updated to '+res.data.message.score;
                    console.log(res.data.message);
                }else{
                    self.resStatus=false;
                    self.response='Error updating score '+res.data.message;
                    console.log(res.data.message);
                }
            },function (err) {
                self.resStatus=false;
                console.log(err);
                self.response='Error updating score '+err;
            });
        }
    };
    $scope.submit=function () {
            var data={
                code: self._editor.getValue(),
                input:$scope.inputData
            }
            console.log(data);
            code.compile(data).then(function (res) {
                if(res.data.status){
                    $scope.outputData=res.data.message;
                    console.log(res.data.message);
                }else{
                    $scope.outputData=res.data.message;
                    console.log(res.data.message);
                }
            });
        }

    $scope.reset=function () {
            $scope.inputData="";
            $scope.outputData="";
        }

}])