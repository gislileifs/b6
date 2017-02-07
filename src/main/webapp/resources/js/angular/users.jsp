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
		<th>Full name</th>
		<th>User name</th>
	</tr>
	<tbody>
	<tr ng-repeat="u in ctrl.users"  style="cursor: pointer">
	</tbody>
	</table>
	
	</div>
	
	</div>
	
	<button type="button" class="btn custom-width" ng-click="ctrl.editUser($event, user.id)">Create</button>

<div id="errorDiv"></div>	
</div>