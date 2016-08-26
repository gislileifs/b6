<!-- %@ page contentType="text/html; charset=UTF-8" % -->

<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div ng-app="myApp" class="ng-cloak" ng-strict-di
	ng-controller="AppCtrl">

      <div class="generic-container" ng-controller="WineController as ctrl">
      
      <!--  -->
      <!-- Modal -->
<div id="myModal" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><span ng-bind="ctrl.wineLogEntry.name"></span></h4>
      </div>
      <div class="modal-body">     
      		<table class="table">
      			<tr>
      				<th> Flotvog fyrir </th>
      				<td style="text-align: right"><span ng-bind="ctrl.wineLogEntry.initialGravity"></span></td>
      			</tr>
      			<tr>
      				<th> Flotvog eftir </th>
      				<td style="text-align: right"><span ng-bind="ctrl.wineLogEntry.finalGravity"></span></td>
      			</tr>
      			<tr>
      				<th> Alkóhól </th>
      				<td style="text-align: right"><span>{{ctrl.alcohol()}}%</span></td>
      			</tr>
      			<tr>
      				<th> Sykur í eftirsætu </th>
      				<td style="text-align: right"><span>{{ctrl.wineLogEntry.sugar}}g</span></td>
      			</tr>
      		</table>
      	<div class="row">
      	</div>  
	      <div>
	      <strong>Skref</strong>
	      	<ol id="steplist">
	      	<li ng-repeat="k in ctrl.wineLogEntry.steps track by $index" set-focus='$last' id="{{'step' + $index}}">
	      	<span ng-bind="ctrl.wineLogEntry.steps[$index].date | date:'d.M.yyyy'"></span>
	      	<br>
	      	{{k.text}}
	      	</li>
	      </ol>
	      </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" ng-click="ctrl.remove( ctrl.wineLogEntry.id )" class="btn" style="float:left">Eyða víni</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
      <!--  -->
      
          <div id="editPanel" class="panel panel-default" style="display:none">
              <div class="panel-heading"><span class="lead"> {{ctrl.wineLogEntry.id ? ctrl.wineLogEntry.name : 'Nýtt vín'}} </span>
              <button id="cancelAddWine" type="button" ng-click="ctrl.cancelAddLogEntry()" class="btn" style="float:right; display:none">Cancel</button>
           </div>
              <div class="formcontainer" style="padding:10px">

                  <form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
                      <input type="hidden" ng-model="ctrl.wineLogEntry.id" />
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="uname">Nafn</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.wineLogEntry.name" id="wineName" class="username form-control input-sm" placeholder="Enter wine name" required ng-minlength="3"/>
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
                              <label class="col-md-2 control-lable" for="rtype">Tegund</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.wineLogEntry.type" id="rtype" class="form-control input-sm" placeholder="Enter recipe type [This field is validation free]"/>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                      	<div class="form-group col-md-12">
                      		  <label class="col-md-2 control-lable" for="rdate">Dags</label>
                      		  <div flex-gt-xs="">
						        <md-datepicker ng-model="myDate" id="rdate" md-placeholder="Enter date"></md-datepicker>
						      </div>
                      	</div>
                      </div>
                      
                       <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="rinitialGravity">Flotvog fyrir</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.wineLogEntry.initialGravity" id="rinitialGravity" 
                                  ng-pattern="/^\d{0,9}(\.\d{1,9})?$/"
                                  class="form-control input-sm" placeholder="Enter gravity"/>
                              </div>
                          </div>
                      </div>      
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="rfinalGravity">Flotvog eftir</label>
                              <div class="col-md-7">
                                  <input type="number" ng-model="ctrl.wineLogEntry.finalGravity" id="rfinalGravity" 
                                  ng-pattern="/^\d{0,9}(\.\d{1,9})?$/"
                                  class="form-control input-sm" placeholder="Enter gravity"/>
                              </div>
                          </div>
                      </div>    
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="rsugar">Eftirsæta</label>
                              <div class="col-md-7">
                                  <input type="number" ng-model="ctrl.wineLogEntry.sugar" id="rsugar" 
                                  ng-pattern="/^\d{0,9}(\.\d{1,9})?$/"
                                  class="form-control input-sm" placeholder="Enter sugar"/>
                              </div>
                          </div>
                      </div>    
	                      <table class="table" id="stepsTable">
						<caption style="fontsize: 16pt">Skref</caption>
						<tr ng-repeat="s in ctrl.wineLogEntry.steps track by $index">
						<td style="width: 15%">
							<md-datepicker ng-model="ctrl.wineLogEntry.steps[$index].date" md-placeholder="Enter date"></md-datepicker>						
						</td>
						<td style="width: 70%">
						<input type="text" ng-model="ctrl.wineLogEntry.steps[$index].text" class="form-control" focus="$last" />
						</td>
						<td style="width: 15%">
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
                              <input type="submit"  value="{{!ctrl.wineLogEntry.id ? 'Add Wine' : 'Update Wine'}}" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
                          </div>
                      </div>
                  </form>
              </div>
          </div>

          <div class="panel panel-default">
                <!-- Default panel contents -->
              <div class="panel-heading">
              <span class="lead">Víngerðardagbók </span>
	              <div style="float:right">
			       <button id="addWine" type="button" ng-click="ctrl.addLogEntry()" class="btn btn-sm btn-default" >Nýtt vín</button>
	              </div>
	              <div class=" col-lg-3 col-md-4 col-sm-6" style="float:right">
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
                          	<td ng-click="ctrl.edit(u.id)" style="padding-left: 20px">
                          		<i class="fa fa-pencil"></i>
                          	</td>
                              <td ng-click="ctrl.display(u.id)"><span ng-bind="u.name"></span></td>
                              <td ng-click="ctrl.display(u.id)"><span ng-bind="u.type"></span></td>
                              <td ng-click="ctrl.display(u.id)"><span ng-bind="u.date | date:'d.M.yyyy'"></span></td>
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

      <script src="<c:url value='resources/js/angular/app.js' />"></script>
      <script src="<c:url value='resources/js/angular/wineService.js' />"></script>
      <script src="<c:url value='resources/js/angular/wineController.js' />"></script>
  
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