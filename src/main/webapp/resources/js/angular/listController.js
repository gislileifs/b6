'use strict';

app.controller('ListController', ['$scope', 'ListService', '$mdDialog', function($scope, ListService, $mdDialog) {
	var self = this;
    self.list={name:'',date: new Date(),text:'', items: []};
    self.lists = [];

    self.fetchLists = function(){
        ListService.fetchLists()
            .then(
                         function(u) {
                              self.lists = u;
                              //console.log("Controller:  updated");
                         },
                          function(errResponse){
                              console.error('Error while fetching lists. ' + JSON.stringify(errResponse));
                          }
                 );
    };
    
    self.fetchLists();
    
    self.reset = function() {
        self.list={name:'',date: new Date(),text:'',items:[]};
    }
    
    self.addList = function(ev) {
    	self.reset();
    	self.editList(ev);
    }
    
    self.editList = function(ev, id) {
    	console.log("edit list");
      $mdDialog.show({
          locals:{dataToPass: self.list},                
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
    
   
    self.edit = function(event, id){
        console.log('id to be edited', id);
        
        for(var i = 0; i < self.lists.length; i++){
            if(self.lists[i].id === id) {
               self.list = angular.copy(self.lists[i]);
               break;
            }
        }
        
        self.editList( event );
    };
    
    self.submit = function() {
    	//console.log("dialog submitted. Before save user. User: " + JSON.stringify(self.user));
    	self.saveList(self.list);
    	console.log("After save list");
    	self.reset();
    };
    
    self.saveList = function(user) {
    	console.log("save list: " + JSON.stringify(user) );
    	ListService.saveList(list)
    	.then(
    			self.fetchLists,
    			function(error) {
    				console.log("Error while saving list: " + error);
    			}
    			);
    }
    
    self.deleteList = function(id) {
    	ListService.deleteList(id)
    	.then(
    			self.fetchLists,
    			function(error) {
    				console.log("Error while deleting list: " + JSON.stringify(error));
    			}
    		);
    }
	
    function DialogController($scope, $mdDialog, dataToPass) {
  	  $scope.list = dataToPass;
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
