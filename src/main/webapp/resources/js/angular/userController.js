'use strict';

app.controller('UserController', ['$scope', 'UserService', '$mdDialog', function($scope, UserService, $mdDialog) {
	var self = this;
    self.user={id:null,name:'',username:'',password:''};
    self.users=[];

    self.fetchUsers = function(){
        UserService.fetchUsers()
            .then(
                         function(d) {
                              self.users = d;
                              console.log("Controller: self.users: " + JSON.stringify(d));
                         },
                          function(errResponse){
                              console.error('Error while fetching winelog');
                          }
                 );
    };
    
    self.fetchUsers();
    
    self.reset = function() {
    	self.user={id:null,name:'',username:'',password:''};
    }
    
    self.addUser = function(ev) {
    	self.reset();
    	self.editUser(ev);
    }
    
    self.editUser = function(ev, id) {
    	console.log("edit user");
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
      	console.log("save user " + JSON.stringify(answer));
      	self.saveUser(answer);
      	//self.fetchUsers();
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };
    
    self.edit = function(event, id){
        console.log('id to be edited', id);
        
        for(var i = 0; i < self.users.length; i++){
            if(self.users[i].id === id) {
               self.user = angular.copy(self.users[i]);
               break;
            }
        }
        
        self.editUser( event );
    };
    
    self.saveUser = function(user) {
    	console.log("saveUser: " + JSON.stringify(user) );
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
