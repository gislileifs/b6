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

			<a ng-href="{{ctrl.recipe.url}}" target="_blank">Hlekkur � uppskrift</a>

	      <div>
	      <strong>Hr�efni</strong>
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
        <button type="button" class="btn btn-default" style="float:left" ng-click="ctrl.remove( ctrl.recipe.id )">Ey�a uppskrift</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>      

          <div class="panel panel-default">
                <!-- Default panel contents -->
              <div class="panel-heading">
              <span class="lead">Uppskriftir </span>
              		<div style="float:right">
		           <button id="addRecipe" type="button" ng-click="ctrl.addRecipe($event)" class="btn btn-default btn-sm" >N� uppskrift</button>
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
                      <!-- ng-click="ctrl.edit(u.id)" -->
                          <tr ng-repeat="u in ctrl.recipes | filter:recipeFilter"  style="cursor: pointer">
                          	<td 
                          	ng-click="ctrl.edit(u.id, $event)"
                          	style="padding-left: 20px">
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
  <div id="errorDiv">
  </div>
  
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