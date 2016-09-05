'use strict';
 
app.controller('RecipeController', ['$scope', '$document', 'RecipeService', '$mdDialog', function($scope, $document, RecipeService, $mdDialog) {
          var self = this;
          self.recipe={id:null,name:'',type:'', url:''};
          self.recipes=[];
          self.recipe.ingredients=[];
          self.recipe.steps=[];
          $scope.editPanelVisible = false;
      /*    
          $document.bind("keypress", function(event) {
              if( event.keyCode == 27 ) {
            	  //alert( "bind" );
            	  //editPanelVisible = false;
            	  var mController = angular.element(document.getElementById("RecipeController"));
            	  mController.scope().cancelAddRecipe();
              }
          });
          */
          
          $scope.trustSrc = function(src) {
        	  return $src.trustAsResourceUrl(src);
          }
               
          self.fetchAllRecipes = function(){
              RecipeService.fetchAllRecipes()
                  .then(
                               function(d) {
                                    self.recipes = d;
                               },
                                function(errResponse){
                                    console.error('Error while fetching recipes');
                                }
                       );
          };
            
          self.createRecipe = function(recipe){
              RecipeService.createRecipe(recipe)
                      .then(
                      self.fetchAllRecipes, 
                              function(errResponse){
                                   console.error('Error while creating recipe.');
                              } 
                  );
          };
          
          self.addRecipe = function(event) {
        	  //$("#editPanel").fadeIn('fast');
        	  //alert('edit');
        	  //$scope.editPanelVisible = true;
        	  self.reset();
        	  //toggleButtons();
        	  //$("#recipeName").focus();
        	  //alert("xx");
        	  //setTimeout(setFocus, 50 );
              self.editRecipe(event, self.recipe);
          }
          
          function setFocus() {
        	  $("#recipeName").focus();
        	  //alert("setFocus");
          }
          
          self.cancelAddRecipe = function() {
        	  //$("#editPanel").fadeOut('fast');
        	  $scope.editPanelVisible = false;        	  
        	  self.reset();
        	  toggleButtons();
          } 
          
          var toggleButtons = function() {
        	  $("#addRecipe").toggle();
        	  $("#cancelAddRecipe").toggle();        	  
          }
 
         self.updateRecipe = function(recipe, id){
        	 //alert("steps: " + recipe.steps);
              RecipeService.updateRecipe(recipe, id)
                      .then(
                              self.fetchAllRecipes, 
                              function(errResponse){
                                   console.error('Error while updating recipe.');
                              } 
                  );
          };
 
         self.deleteRecipe = function(id){
              RecipeService.deleteRecipe(id)
                      .then(
                              self.fetchAllRecipes, 
                              function(errResponse){
                                   console.error('Error while deleting recipe.');
                              } 
                  );
          };
 
          self.fetchAllRecipes();
 
          self.submit = function() {
        	  //alert(JSON.stringify(self.recipe));
              if(self.recipe.id===null){
                  console.log('Saving New Recipe', self.recipe);    
                  self.createRecipe(self.recipe);
              }else{
                  self.updateRecipe(self.recipe, self.recipe.id);
                  console.log('Recipe updated with id ', self.recipe.id);
              }
              self.reset();
              //toggleButtons();
              //$("#editPanel").fadeOut('fast');
          };
               
          self.edit = function(id, event){
              console.log('id to be edited', id);
              //$("#editPanel").fadeIn('fast');
              //$scope.editPanelVisible = true;
              
              //toggleButtons();
              
              for(var i = 0; i < self.recipes.length; i++){
                  if(self.recipes[i].id === id) {
                     self.recipe = angular.copy(self.recipes[i]);
                     break;
                  }
              }

              if( self.recipe.ingredients == null ) {
            	  self.recipe.ingredients = [];
            	  self.recipe.ingredients.push("");
              }
              if( self.recipe.steps == null ) {
            	  self.recipe.steps = [];
            	  self.recipe.steps.push("");
              }
           
              self.recipe.ingredients = trimArray(self.recipe.ingredients);
              self.recipe.steps = trimArray(self.recipe.steps);
              
              self.editRecipe(event, self.recipe);
              //self.recipe.ingredients.push("");
          };
          
          var trimArray = function(array) {
        	  for (var i = 0; i < array.length; i++) {
          	    if (array[i] == "") {         
        	    	array.splice(i, 1);
        	    	i--;
        	    }
        	  }
        	  return array;
          }
          
          self.display = function(event, id){
              
              for(var i = 0; i < self.recipes.length; i++){
                  if(self.recipes[i].id === id) {
                     self.recipe = angular.copy(self.recipes[i]);
                     break;
                  }
              }
             
        	  //$('#myModal').modal('show');
              self.displayRecipe( event, self.recipe );
          };
          /*
          self.delIngredient = function(index) {
        	  self.recipe.ingredients.splice(index, 1);
          }
          
          self.addIngredient = function() {
        	  self.recipe.ingredients.push("");
          }
          
          self.addStep = function() {
        	  self.recipe.steps.push("");
        	  var i = self.recipe.steps.length - 1;
        	  angular.element("#step0").focus();
        	  $('#steplist li:last-child:input').focus();
          }
          
          self.deleteStep = function(index) {
        	  self.recipe.steps.splice(index, 1);
          }
          */
               
          self.remove = function(id){
              console.log('id to be deleted', id);
              if(self.recipe.id === id) {//clean form if the recipe to be deleted is shown there.
                 self.reset();
              }
              self.deleteRecipe(id);
              //$('#myModal').modal('hide');
          };
 
           
          self.reset = function(){
              self.recipe={id:null,name:'',type:''};
              self.recipe.ingredients = [];
              //for( var i = 0; i < 5; i++ )
            	//  self.recipe.ingredients.push("");
              self.recipe.steps = [];
              //for( var i = 0; i < 5; i++ )
            	//  self.recipe.steps.push("");
              //$scope.recipeForm.$setPristine(); //reset Form
          };
          
          self.editRecipe = function(ev, recipe) {
        	  //alert(self.recipe.name);
            $mdDialog.show({
                locals:{dataToPass: self.recipe},                
              controller: DialogController,
             /* controllerAs: 'dialog', */
              preserveScope: true,
              templateUrl: 'resources/js/angular/recipeEdit.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            	self.submit();
            	//alert(answer.name);
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };
          
          self.displayRecipe = function(ev, recipe) {
        	  //alert(self.recipe.name);
            $mdDialog.show({
                locals:{dataToPass: self.recipe},                
              controller: DialogController,
             /* controllerAs: 'dialog', */
              preserveScope: true,
              templateUrl: 'resources/js/angular/recipeDisplay.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            	//self.submit();
            	//alert(answer.name);
            	self.remove(answer); //Remove the recipe
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };
          
          function DialogController($scope, $mdDialog, dataToPass) {
        	  $scope.recipe = dataToPass;
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
        	    	$mdDialog.hide($scope.recipe);
        	    }
                $scope.delIngredient = function(index) {
              	  $scope.recipe.ingredients.splice(index, 1);
                }
                
                $scope.addIngredient = function() {
              	  $scope.recipe.ingredients.push("");
                }
                
                $scope.addStep = function() {
              	  $scope.recipe.steps.push("");
                }
                
                $scope.deleteStep = function(index) {
              	  $scope.recipe.steps.splice(index, 1);
                }
                
                $scope.prepareRemoval = function() {
                	$scope.showRemove = true;
                }
                
                $scope.removeRecipe = function(id) {
                	$mdDialog.hide(id);
        	  	}
          	}
        	  DialogController.$inject = ['$scope','$mdDialog','dataToPass'];
 
      }]);