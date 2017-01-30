<md-dialog>
<div id="myModal">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><span ng-bind="user.name"></span></h4>
      </div>
      <div class="modal-body">     
      		<table class="table">
      			<tr>
      				<th> Notandanafn </th>
      				<td style="text-align: left"><span ng-bind="user.username"></span></td>
      			</tr>
      			<tr>
      				<th> Aðgangsorð </th>
      				<td style="text-align: left"><span ng-bind="user.password"></span></td>
      			</tr>
      		</table>
      	<div class="row">
      	</div>  

      </div>
      
      <div class="modal-footer">
        <md-button type="button" ng-click="prepareUser()" class="btn" style="float:left">Eyða notanda</md-button>
        <md-button type="button" ng-show="showRemove" ng-click="removeUser( user.id )" class="btn" style="float:left">Eyða í alvöru</md-button>
        <md-button type="button" class="btn btn-default" data-dismiss="modal">Close</md-button>
      </div>
    </div>

  </div>
</div>
</md-dialog>