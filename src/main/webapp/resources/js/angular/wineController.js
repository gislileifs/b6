'use strict';
 
app.controller('WineController', ['$scope', 'WineService', '$mdDialog', function($scope, WineService, $mdDialog) {
          var self = this;
          self.wineLogEntry={id:null,name:'',type:''};
          self.wineLog=[];
          self.wineLogEntry.steps=[];
               
          self.fetchWineLog = function(){
              WineService.fetchWineLog()
                  .then(
                               function(d) {
                                    self.wineLog = d;
                                    for(var i = 0; i < self.wineLog.length; i++){
                                    	self.wineLog[i].date = new Date(self.wineLog[i].date);
                                    }
                               },
                                function(errResponse){
                                    console.error('Error while fetching winelog');
                                }
                       );
          };
            
          self.createLogEntry = function(entry){
              WineService.createLogEntry(entry)
                      .then(
                      self.fetchWineLog, 
                              function(errResponse){
                                   console.error('Error while creating the wine log.');
                              } 
                  );
          };
          
          self.addLogEntry = function(event) {
        	  console.log("addLogEntry");
        	  self.reset();
        	  self.editWineLogEntry(event);
          }
          
          function setFocus() {
        	  $("#wineName").focus();
        	  //alert("setFocus");
          }
 
         self.updateWineLogEntry = function(entry, id){
              WineService.updateLogEntry(entry, id)
                      .then(
                              self.fetchWineLog, 
                              function(errResponse){
                                   console.error('Error while updating wine log.');
                              } 
                  );
          };
 
         self.deleteWineLogEntry = function(id){
              WineService.deleteLogEntry(id)
                      .then(
                              self.fetchWineLog, 
                              function(errResponse){
                                   console.error('Error while deleting wine log.');
                              } 
                  );
          };
 
          self.fetchWineLog();
 
          self.submit = function() {
        	  //alert(JSON.stringify(self.recipe));
        	  //self.wineLogEntry.date = $scope.myDate;
              if(self.wineLogEntry.id===null){
                  console.log('Saving New wine log', self.wineLogEntry);    
                  self.createLogEntry(self.wineLogEntry);
              }else{
                  self.updateWineLogEntry(self.wineLogEntry, self.wineLogEntry.id);
                  console.log('wine log updated with id ', self.wineLogEntry.id);
              }
              self.reset();
          };
               
          self.edit = function(event, id){
              console.log('id to be edited', id);
              
              for(var i = 0; i < self.wineLog.length; i++){
                  if(self.wineLog[i].id === id) {
                     self.wineLogEntry = angular.copy(self.wineLog[i]);
                     break;
                  }
              }

              if( self.wineLogEntry.steps == null ) {
            	  self.wineLogEntry.steps = [];
            	  var step = createStep();
            	  self.wineLogEntry.steps.push(step);
              }
           
              self.wineLogEntry.steps = trimArray(self.wineLogEntry.steps);
              //$scope.myDate = new Date(self.wineLogEntry.date);
              self.wineLogEntry.date = new Date(self.wineLogEntry.date);
              for( var i = 0; i < self.wineLogEntry.steps.length; i++ ) {
            	  self.wineLogEntry.steps[i].date = new Date(self.wineLogEntry.steps[i].date);
            	  //alert(self.wineLogEntry.steps[i].date);
              }
              
              //self.recipe.ingredients.push("");
              self.editWineLogEntry( event );
          };
          
          self.editWineLogEntry = function(ev) {
            $mdDialog.show({
                locals:{dataToPass: self.wineLogEntry},                
              controller: DialogController,
             /* controllerAs: 'dialog', */
              preserveScope: true,
              templateUrl: 'resources/html/winelogEdit.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            	console.log("save wine");
            	self.submit();
            	//alert(answer.name);
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };
          
          self.displayWineLogEntry = function(ev) {
            $mdDialog.show({
                locals:{dataToPass: self.wineLogEntry},                
              controller: DialogController,
             /* controllerAs: 'dialog', */
              preserveScope: true,
              templateUrl: 'resources/html/winelogDisplay.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            	self.remove(answer);
            	//alert(answer.name);
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };
          
          function DialogController($scope, $mdDialog, dataToPass) {
        	  $scope.wineLogEntry = dataToPass;
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
        	    
                var createStep = function() {
              	  var step = new Object();
              	  step.date = new Date();
              	  step.text = "";
              	  return step;
                }
                
                $scope.addStep = function() {
              	  //$scope.wineLogEntry.steps.push("");
                	var newStep = createStep();
              	  var len = $scope.wineLogEntry.steps.length;
              	  if( len > 0 ) {
              		  newStep.date = $scope.wineLogEntry.steps[len-1].date;
              	  }
              	  else {
              		  newStep.date = $scope.wineLogEntry.date;
              	  }
              	  $scope.wineLogEntry.steps.push(newStep);
                }
                
                $scope.deleteStep = function(index) {
              	  $scope.wineLogEntry.steps.splice(index, 1);
                }
                
                $scope.prepareRemoval = function() {
                	$scope.showRemove = true;
                }
                
                $scope.removeWineLogEntry = function(id) {
                	$mdDialog.hide(id);
        	  	}
                
                $scope.alcohol = function() {
              	  var a = ($scope.wineLogEntry.initialGravity - $scope.wineLogEntry.finalGravity) / 7.5;
              	  return Math.round( a * 10 ) / 10;
                }
          	}
        	  DialogController.$inject = ['$scope','$mdDialog','dataToPass'];
 
          
          var trimArray = function(array) {
        	  for (var i = 0; i < array.length; i++) {
          	    if (array[i].text == "") {         
        	    	array.splice(i, 1);
        	    	i--;
        	    }
        	  }
        	  return array;
          }
          
          self.display = function(event,id){
              
              for(var i = 0; i < self.wineLog.length; i++){
                  if(self.wineLog[i].id === id) {
                     self.wineLogEntry = angular.copy(self.wineLog[i]);
                     break;
                  }
              }
              for( var i = 0; i < self.wineLogEntry.steps.length; i++ ) {
            	  self.wineLogEntry.steps[i].date = new Date(self.wineLogEntry.steps[i].date);
              }
             
        	  //$('#myModal').modal('show');
              self.displayWineLogEntry(event);
          };
          
          var createStep = function() {
        	  var step = new Object();
        	  step.date = new Date();
        	  step.text = "";
        	  return step;
          }
          
          self.addStep = function() {
        	  var newStep = createStep();
        	  var len = self.wineLogEntry.steps.length;
        	  if( len > 0 ) {
        		  newStep.date = self.wineLogEntry.steps[len-1].date;
        	  }
        	  else {
        		  newStep.date = self.wineLogEntry.date;
        	  }
        	  self.wineLogEntry.steps.push(newStep);
        	  var i = self.wineLogEntry.steps.length - 1;
        	  angular.element("#step0").focus();
        	  $('#steplist li:last-child:input').focus();
          }
          
          self.deleteStep = function(index) {
        	  self.wineLogEntry.steps.splice(index, 1);
          }
               
          self.remove = function(id){
              console.log('id to be deleted', id);
              if(self.wineLogEntry.id === id) {//clean form if the recipe to be deleted is shown there.
                 self.reset();
              }
              self.deleteWineLogEntry(id);
          };
 
           
          self.reset = function(){
              self.wineLogEntry={id:null,name:'',type:''};
              self.wineLogEntry.steps = [];
              self.wineLogEntry.date = new Date();

              //self.wineLogEntry.steps.push(createStep());
              //$scope.myDate = new Date();
              //$scope.myForm.$setPristine(); //reset Form
          };
          
          self.alcohol = function() {
        	  var a = (self.wineLogEntry.initialGravity - self.wineLogEntry.finalGravity) / 7.5;
        	  return Math.round( a * 10 ) / 10;
          }
 
      }]);