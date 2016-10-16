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
                    console.log(res.data.message);
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
.controller('checkSolnCtrl',['$scope','$stateParams','$window','solutionSrvAdmin',function ($scope,$stateParams,$window,solutionSrv) {
    var self=$scope;
    self.question=$stateParams.question;
    self.response='';
    self.resStatus=false;
    self.setScore=function () {
        solutionSrv.updateScore($stateParams.solution,{score:self.score}).then(function (res) {
            if(res.data.status){
                self.resStatus=true;
                self.response='score updated to '+res.data.message.score;
            }else{
                self.resStatus=false;
                self.response='Error updating score '+res.data.message;
            }
        },function (err) {
                self.resStatus=false;
                self.response='Error updating score '+err;
        })
    };
}])