<div class="ng-cloak" ng-strict-di
	ng-controller="UserController as ctrl">

	<div class="panel panel-default">
	<div class="panel-heading">
	Users
	</div>
	
	<div class="tablecontainer">
	<table class="table table-hover">
	<thead>
	<tr>
		<th></th>
		<th>Full name</th>
		<th>User name</th>
	</tr>
	<tbody>
	<tr ng-repeat="u in ctrl.users"  style="cursor: pointer">
   	<td ng-click="ctrl.edit($event, u.id)" style="padding-left: 20px">
  		<i class="fa fa-pencil"></i>
  	</td>
	<td ng-bind="u.name"></td>
	</tr>
	</tbody>
	</table>
	
	</div>
	
	</div>
	
	<button type="button" class="btn custom-width" ng-click="ctrl.editUser($event, user.id)">Create</button>

<div id="errorDiv"></div>	
</div>