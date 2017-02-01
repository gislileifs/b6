<!-- %@ page contentType="text/html; charset=UTF-8" % -->

<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="ng-cloak" ng-strict-di
	ng-controller="AppCtrl">

      <div class="generic-container" ng-controller="WineController as ctrl">      
   
          <div class="panel panel-default">
                <!-- Default panel contents -->
              <div class="panel-heading">
              <span class="lead">Víngerðardagbók </span>
	              <div style="float:right">
			       <button id="addWine" type="button" ng-click="ctrl.addLogEntry($event)" class="btn btn-sm btn-default" >Nýtt vín</button>
	              </div>
	              <div class=" col-lg-3 col-md-4 col-sm-6 col-xs-5" style="float:right">
	              <input placeholder="Filter wines" type="text" ng-model="wineFilter" class="form-control"/>
	              </div>
              </div>
              <div class="tablecontainer">
              
                  <table class="table table-hover">
                      <thead>
                          <tr>
                          	<th></th>
                              <th>Nafn</th>
                              <th>Tegund</th>
                              <th>Dags.</th>
                              <th class="hideInPortrait"> Flotvog fyrir </th>
                              <th class="hideInPortrait"> Flotvog eftir </th>
                              <th class="hideInPortrait"> Eftirsæta </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr ng-repeat="u in ctrl.wineLog | filter:wineFilter"  style="cursor: pointer">
                          	<td ng-click="ctrl.edit($event, u.id)" style="padding-left: 20px">
                          		<i class="fa fa-pencil"></i>
                          	</td>
                              <td ng-click="ctrl.display($event, u.id)"><span ng-bind="u.name"></span></td>
                              <td ng-click="ctrl.display($event, u.id)"><span ng-bind="u.type"></span></td>
                              <td ng-click="ctrl.display($event, u.id)"><span ng-bind="u.date | date:'d.M.yyyy'"></span></td>
                              <td class="hideInPortrait" ng-click="ctrl.display(u.id)"><span ng-bind="u.initialGravity"></span></td>
                              <td class="hideInPortrait" ng-click="ctrl.display(u.id)"><span ng-bind="u.finalGravity"></span></td>
                              <td class="hideInPortrait" ng-click="ctrl.display(u.id)"><span ng-bind="u.sugar"></span>g</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
       
  </div>
  <div id="errorDiv" class="panel panel-default"></div>

  
  <script>

  	function removeRecipe( ctrl, id ) {
  	  	alert(id);
		ctrl.remove(id);
  	}

  	function setFocusOnStep() {
  	  	alert("focus");
  		$('#steplist li:last-child:input').focus();
  	}

  </script>