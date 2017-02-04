'use strict';

app.controller('UserController', ['$scope', 'UserService', '$mdDialog', function($scope, UserService, $mdDialog) {
	var self = this;
    self.user={id:null,name:'',username:'',password:''};
    self.users=[];
	
	self.createUser = function() {
		
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
    	  //alert(JSON.stringify(answer));
      	console.log("save user");
      	self.saveUser(answer);
      	//alert(answer.username);
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };
    
    self.saveUser = function(user) {
    	UserService.saveUser(user);
    }
	
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
  	    	$mdDialog.hide($scope.user);
  	    }
    }
    DialogController.$inject = ['$scope','$mdDialog','dataToPass'];
	
}]);