var codeModule=angular.module('codeModule');

codeModule.controller('codeEditor',['$scope','code',function ($scope,code) {
    $scope.inputData="";
    $scope.outputData="";
	$scope.aceLoaded = function(_editor){
    	// Editor part
    	var _session = _editor.getSession();
    	var _renderer = _editor.renderer;
    	//var _mode=_session.setMode("ace/mode/c_cpp");
    	var initial = _editor.setValue("#include<stdio.h>\nint main(){\n\n}");

    	// Options
    	_editor.setReadOnly(false);
    	_session.setUndoManager(new ace.UndoManager());
    	_renderer.setShowGutter(false);

    	// Events
    	_editor.on("changeSession", function(){ });
    	_session.on("change", function(){ });
    	$scope.submit=function () {
    		var data={
    			code: _editor.getValue(),
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
    };
}])
.service('code',function ($http) {
	var self=this;
	this.compile=function (data) {
		return $http.post('/code',data);
	}
});