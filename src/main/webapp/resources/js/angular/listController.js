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
                              $("#errorDiv").html(JSON.stringify(errResponse));
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
        templateUrl: 'resources/html/listEdit.html',
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
    
    var getList = function(listId) {
        for(var i = 0; i < self.lists.length; i++){
            if(self.lists[i].id === listId) {
               self.list = angular.copy(self.lists[i]);
               break;
            }
        }
        self.list.date = new Date(self.list.date);
        for( var i = 0; i < self.list.items.length; i++ ) {
      	  self.list.items[i].date = new Date(self.list.items[i].date);
        }  
        return self.list;
    }
   
    self.edit = function(event, id){
        console.log('id to be edited', id);

        self.list = getList(id);
        
        self.editList( event );
    };
    
    self.display = function(event,id){
        self.list = getList(id);       
        self.displayList(event);
    };
    
    self.submit = function() {
    	//console.log("dialog submitted. Before save user. User: " + JSON.stringify(self.user));
    	self.saveList(self.list);
    	console.log("After save list");
    	self.reset();
    };
    
    self.saveList = function(list) {
    	console.log("save list: " + JSON.stringify(list) );
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
    

    
    self.displayList = function(ev) {
        $mdDialog.show({
            locals:{dataToPass: self.list},                
          controller: DialogController,
          preserveScope: true,
          templateUrl: 'resources/html/listDisplay.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
        	//self.remove(answer);
        	//alert(answer.name);
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };
	
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
        
        $scope.removeList = function(id) {
        	$mdDialog.hide("remove:"+id);
	  	}
  	    
  	    $scope.submit = function() {
  	    	$mdDialog.hide($scope.user);
  	    }
  	    
  	    var createItem = function() {
  	  	  var item = new Object();
  	  	  item.date = new Date();
  	  	  item.text = "";
  	  	  return item;
  	    }
  	    
  	    $scope.addItem = function() {
  	    	console.log("In addItem");
  	  	  var newItem = createItem();
  	  	  var len = $scope.list.items.length;
  	  	  if( len > 0 ) {
  	  		  newItem.date = $scope.list.items[len-1].date;
  	  	  }
  	  	  else {
  	  		  newItem.date = new Date();
  	  	  }
  	  	  $scope.list.items.push(newItem);
  	  	  var i = $scope.list.items.length - 1;
  	  	  angular.element("#item0").focus();
  	  	  $('#itemlist li:last-child:input').focus();
  	    }
  	    
  	    $scope.deleteItem = function(index) {
  	  	  $scope.list.items.splice(index, 1);
  	    }
    }
    DialogController.$inject = ['$scope','$mdDialog','dataToPass'];
    
}]);
