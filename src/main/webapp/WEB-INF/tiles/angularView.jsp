<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div ng-app="myApp" class="ng-cloak" ng-strict-di>

      <div class="generic-container" ng-controller="RecipeController as ctrl">
      
      <!--  -->
      <!-- Modal -->
<div id="myModal" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><span ng-bind="ctrl.recipe.name"></span></h4>
      </div>
      <div class="modal-body">       

			<a ng-href="{{ctrl.recipe.url}}">Hlekkur á uppskrift</a>

	      <div>
	      <strong>Hráefni</strong>
	      <ul>
	      	<li ng-repeat="i in ctrl.recipe.ingredients track by $index" >
	      	{{i}}
	      	</li>
	      </ul>
	      </div>
	      <div>
	      <strong>Skref</strong>
	      	<ol id="steplist">
	      	<li ng-repeat="k in ctrl.recipe.steps track by $index" set-focus='$last' id="{{'step' + $index}}">
	      	{{k}}
	      	</li>
	      </ol>
	      </div>

      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-default" style="float:left" ng-click="ctrl.remove( ctrl.recipe.id )">Eyða uppskrift</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
      <!--  -->
      
          <div id="editPanel" class="panel panel-default" style="display:none">
              <div class="panel-heading"><span class="lead">{{!ctrl.recipe.id ? 'Ný uppskrift' : ctrl.recipe.name}}</span>
              <button id="cancelAddRecipe" type="button" ng-click="ctrl.cancelAddRecipe()" class="btn" style="float:right; display:none">Hætta við</button>
              </div>
              <div class="formcontainer" style="padding:10px">

                  <form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
                      <input type="hidden" ng-model="ctrl.recipe.id" />
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="uname">Name</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.recipe.name" id="recipeName" class="username form-control input-sm" placeholder="Enter recipe name" required ng-minlength="3"/>
                                  <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.uname.$error.required">This is a required field</span>
                                      <span ng-show="myForm.uname.$error.minlength">Minimum length required is 3</span>
                                      <span ng-show="myForm.uname.$invalid">This field is invalid </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                         
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="rtype">Type</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.recipe.type" id="rtype" class="form-control input-sm" placeholder="Enter recipe type [This field is validation free]"/>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="rurl">Url</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.recipe.url" id="rurl" class="form-control input-sm" placeholder="Enter URL [This field is validation free]"/>
                              </div>
                          </div>
                      </div>

					<table class="table" id="ingredientTable">
					<caption style="fontsize: 16pt">Ingredients</caption>
					<tr ng-repeat="ing in ctrl.recipe.ingredients track by $index">
					<td>
					<input type="text" ng-model="ctrl.recipe.ingredients[$index]" class="form-control" focus="$last" />
					</td>
					<td>
					<button type="button" tabindex="-1" class="btn custom-width" ng-click="ctrl.delIngredient($index)">Delete</button>
					</td>
					</tr>
					<tr>
					<td colspan="2" style="textalign: left">
					<button type="button" class="btn" ng-click="ctrl.addIngredient()">Add Ingredient</button>
					</td>
					</tr>
					</table>
					
					<table class="table" id="stepsTable">
					<caption style="fontsize: 16pt">Steps</caption>
					<tr ng-repeat="s in ctrl.recipe.steps track by $index">
					<td>
					<input type="text" ng-model="ctrl.recipe.steps[$index]" class="form-control" focus="$last" />
					</td>
					<td>
					<button type="button" tabindex="-1" class="btn custom-width" ng-click="ctrl.deleteStep($index)">Delete</button>
					</td>
					</tr>
					<tr>
					<td colspan="2" style="textalign: left">
					<button type="button" class="btn" ng-click="ctrl.addStep()">Add Step</button>
					</td>
					</tr>
					</table>
 
                      <div class="row">
                          <div class="form-actions floatRight" style="padding-left: 20px">
                              <input type="submit"  value="{{!ctrl.recipe.id ? 'Add Recipe' : 'Update Recipe'}}" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
                              <!-- 
                              <button type="button" ng-click="ctrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset Form</button>
                               -->
                          </div>
                      </div>
                  </form>
              </div>
          </div>
          <div class="panel panel-default">
                <!-- Default panel contents -->
              <div class="panel-heading">
              <span class="lead">Uppskriftir </span>
              		<div style="float:right">
		           <button id="addRecipe" type="button" ng-click="ctrl.addRecipe()" class="btn btn-default btn-sm" >Ný uppskrift</button>
              		</div>
	              <div class=" col-lg-3 col-md-4 col-sm-6" style="float:right">
	              <input placeholder="Filter recipes" type="text" ng-model="recipeFilter" class="form-control"/>
	              </div>
              </div>
              <div class="tablecontainer">
              
                  <table class="table table-hover">
                      <thead>
                          <tr>
                          	<th></th>
                              <th>Nafn</th>
                              <th>Tegund</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr ng-repeat="u in ctrl.recipes | filter:recipeFilter"  style="cursor: pointer">
                          	<td ng-click="ctrl.edit(u.id)" style="padding-left: 20px">
                          		<i class="fa fa-pencil"></i>
                          	</td>
                              <td ng-click="ctrl.display(u.id)"><span ng-bind="u.name"></span></td>
                              <td ng-click="ctrl.display(u.id)"><span ng-bind="u.type"></span></td>
                            
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
       
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
      <script src="<c:url value='resources/js/angular/app.js' />"></script>
      <script src="<c:url value='resources/js/angular/recipeService.js' />"></script>
      <script src="<c:url value='resources/js/angular/recipeController.js' />"></script>
  </div>
  <div id="errorDiv"></div>
  
  <script>

  	function removeRecipe( ctrl, id ) {
  	  	alert(id);
		ctrl.remove(id);
  	}

  	function setFocusOnStep() {
  	  	alert("focus");
  		$('#steplist li:last-child:input').focus();
  	}

  	function showRecipe(url) {
  	  	//alert($("#theUrl").val());
		//$('#myframe').src = $("#theUrl").val();
		$('#myframediv').fadeIn('fast');
  	}

  </script>