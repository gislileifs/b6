<div class="ng-cloak" ng-strict-di
	ng-controller="ListController as ctrl">
	
	<div class="panel panel-default">
	<div class="panel-heading">
	<span class="lead">	Lists </span>
           <div style="float:right">
     <button id="addList" type="button" ng-click="ctrl.addList($event)" class="btn btn-sm btn-default" >Nýr listi</button>
          </div>
	</div>
	<div class="panel-body">

	<div class="tablecontainer">
	<table class="table table-hover">
	<thead>
	<tr>
		<th></th>
		<th>Nafn</th>
		<th>Texti </th>
	</tr>
	<tbody>
	<tr ng-repeat="u in ctrl.lists"  style="cursor: pointer">
   	<td ng-click="ctrl.edit($event, u.id)" style="padding-left: 20px">
  		<i class="fa fa-pencil"></i>
  	</td>
	<td ng-click="ctrl.display($event, u.id)" ng-bind="u.name"></td>
	<td ng-click="ctrl.display($event, u.id)" ng-bind="u.text"></td>
	</tr>
	</tbody>
	</table>
	</div>
	</div>

</div>

