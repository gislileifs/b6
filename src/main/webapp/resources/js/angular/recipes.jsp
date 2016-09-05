<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

      <div class="generic-container" ng-controller="RecipeController as ctrl">
      
          <div class="panel panel-default">
                <!-- Default panel contents -->
              <div class="panel-heading">
              <span class="lead">Uppskriftir </span>
              		<div style="float:right">
		           <button id="addRecipe" type="button" ng-click="ctrl.addRecipe($event)" class="btn btn-default btn-sm" >Ný uppskrift</button>
              		</div>
	              <div class=" col-lg-3 col-md-4 col-sm-3 col-xs-5" style="float:right">
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
                              <td ng-click="ctrl.display($event, u.id)"><span ng-bind="u.name"></span></td>
                              <td ng-click="ctrl.display($event, u.id)"><span ng-bind="u.type"></span></td>
                            
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
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