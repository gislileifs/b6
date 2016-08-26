'use strict';
 
app.controller('WineController', ['$scope', 'WineService', function($scope, WineService) {
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
          
          self.addLogEntry = function() {
        	  $("#editPanel").fadeIn('fast');
        	  self.reset();
        	  toggleButtons();
        	  $("#wineName").focus();
        	  //alert("xx");
        	  setTimeout(setFocus, 50 );
          }
          
          function setFocus() {
        	  $("#wineName").focus();
        	  //alert("setFocus");
          }
          
          self.cancelAddLogEntry = function() {
        	  $("#editPanel").fadeOut('fast');
        	  self.reset();
        	  toggleButtons();
          } 
          
          var toggleButtons = function() {
        	  $("#addWine").toggle();
        	  $("#cancelAddWine").toggle();        	  
          }
 
         self.updateWineLogEntry = function(entry, id){
        	 //alert("Date: " + entry.date);
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
        	  self.wineLogEntry.date = $scope.myDate;
              if(self.wineLogEntry.id===null){
                  console.log('Saving New wine log', self.wineLogEntry);    
                  self.createLogEntry(self.wineLogEntry);
              }else{
                  self.updateWineLogEntry(self.wineLogEntry, self.wineLogEntry.id);
                  console.log('wine log updated with id ', self.wineLogEntry.id);
              }
              self.reset();
              toggleButtons();
              $("#editPanel").fadeOut('fast');
          };
               
          self.edit = function(id){
              console.log('id to be edited', id);
              $("#editPanel").fadeIn('fast');
              toggleButtons();
              
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
              $scope.myDate = new Date(self.wineLogEntry.date);
              for( var i = 0; i < self.wineLogEntry.steps.length; i++ ) {
            	  self.wineLogEntry.steps[i].date = new Date(self.wineLogEntry.steps[i].date);
            	  //alert(self.wineLogEntry.steps[i].date);
              }
              
              //self.recipe.ingredients.push("");
          };
          
          var trimArray = function(array) {
        	  for (var i = 0; i < array.length; i++) {
          	    if (array[i].text == "") {         
        	    	array.splice(i, 1);
        	    	i--;
        	    }
        	  }
        	  return array;
          }
          
          self.display = function(id){
              
              for(var i = 0; i < self.wineLog.length; i++){
                  if(self.wineLog[i].id === id) {
                     self.wineLogEntry = angular.copy(self.wineLog[i]);
                     break;
                  }
              }
              for( var i = 0; i < self.wineLogEntry.steps.length; i++ ) {
            	  self.wineLogEntry.steps[i].date = new Date(self.wineLogEntry.steps[i].date);
              }
             
        	  $('#myModal').modal('show');
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
        		  newStep.date = $scope.myDate;
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
        	  if( confirm( "Are you sure?" ) ) {
	              console.log('id to be deleted', id);
	              if(self.wineLogEntry.id === id) {//clean form if the recipe to be deleted is shown there.
	                 self.reset();
	              }
	              self.deleteWineLogEntry(id);
	              $("#myModal").modal('hide');
        	  }
          };
 
           
          self.reset = function(){
              self.wineLogEntry={id:null,name:'',type:''};
              self.wineLogEntry.steps = [];
              self.wineLogEntry.date = new Date();

              //self.wineLogEntry.steps.push(createStep());
              $scope.myDate = new Date();
              $scope.myForm.$setPristine(); //reset Form
          };
          
          self.alcohol = function() {
        	  var a = (self.wineLogEntry.initialGravity - self.wineLogEntry.finalGravity) / 7.5;
        	  return Math.round( a * 10 ) / 10;
          }
 
      }]);