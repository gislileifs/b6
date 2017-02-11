'use strict';

app.controller('ListController', ['$scope', 'ListService', '$mdDialog', function($scope, ListService, $mdDialog) {
	var self = this;
    self.currentList={name:'',date: new Date(),text:''};
    self.rootList = {id:'',date: new Date(), text:''};

    self.fetchList = function(){
        ListService.fetchList()
            .then(
                         function(u) {
                              self.rootList = u;
                              //console.log("Controller:  updated");
                         },
                          function(errResponse){
                              console.error('Error while fetching list. ' + JSON.stringify(errResponse));
                          }
                 );
    };
    
    self.fetchList();
    
    self.reset = function() {
        self.currentList={name:'',date: new Date(),text:''};
    }
    
    self.addList = function(ev) {
    	self.reset();
    	self.editList(ev);
    }
    
    self.editList = function(ev, id) {
    	console.log("edit list");
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
    	  if( typeof answer == 'string' && answer.startsWith("remove:")) {
    		  var arr = answer.split(":");
    		  //alert(list[1]);
    		  self.deleteList(arr[1]);
    	  }
    	  else {
	      	self.submit();
    	  }
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };
    
    var slugify = function(text) {
	  return text.toString().toLowerCase()
	    .replace(/\s+/g, '-')           // Replace spaces with -
	    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
	    .replace(/^-+/, '')             // Trim - from start of text
	    .replace(/-+$/, '');            // Trim - from end of text
	}
    
    self.findList = function(key)
    
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
    
    self.submit = function() {
    	//console.log("dialog submitted. Before save user. User: " + JSON.stringify(self.user));
    	self.saveUser(self.user);
    	console.log("After save user");
    	self.reset();
    };
    
    self.saveUser = function(user) {
    	console.log("saveUser: " + JSON.stringify(user) );
    	UserService.saveUser(user)
    	.then(
    			self.fetchUsers,
    			function(error) {
    				console.log("Error while saving user: " + error);
    			}
    			);
    }
    
    self.deleteUser = function(id) {
    	UserService.deleteUser(id)
    	.then(
    			self.fetchUsers,
    			function(error) {
    				console.log("Error while deleting user: " + JSON.stringify(error));
    			}
    		);
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
  	    
        $scope.prepareRemoval = function() {
        	$scope.showRemove = true;
        }
        
        $scope.removeUser = function(id) {
        	$mdDialog.hide("remove:"+id);
	  	}
  	    
  	    $scope.submit = function() {
  	    	$mdDialog.hide($scope.user);
  	    }
    }
    DialogController.$inject = ['$scope','$mdDialog','dataToPass'];
    
}]);
