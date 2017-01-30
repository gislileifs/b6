'use strict';

app.controller('UserController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
	var self = this;
    self.user={id:null,name:'',username:'',password:''};
	
	self.createUser = function() {
		alert("Boom!");
	}
	
    self.editUser = function(ev) {
  	  //alert(self.recipe.name);
      $mdDialog.show({
          locals:{dataToPass: self.user},                
        controller: DialogController,
       /* controllerAs: 'dialog', */
        preserveScope: true,
        templateUrl: 'resources/js/angular/userEdit.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
      	console.log("save user");
      	self.submit();
      	alert(answer.username);
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };
	
    function DialogController($scope, $mdDialog, dataToPass) {
  	  $scope.user = dataToPass;
  	  $scope.showRemove = false;
  	  
  	    $scope.hide = function() {
  	      $mdDialog.hide();
  	    };

  	    $scope.cancel = function() {
  	      $mdDialog.cancel();
  	    };

  	    $scope.answer = function(answer) {
  	      $mdDialog.hide(answer);
  	    };
  	    
  	    $scope.submit = function() {
  	    	$mdDialog.hide($scope.wineLogEntry);
  	    }
    }
    DialogController.$inject = ['$scope','$mdDialog','dataToPass'];
	
}]);