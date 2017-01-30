<md-dialog>
<div id="myModal">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><span ng-bind="itemList.name"></span></h4>
      </div>
      <div class="modal-body">     
      		<table class="table">
      			<tr>
      				<th> Texti </th>
      				<td style="text-align: left"><span ng-bind="itemList.text"></span></td>
      			</tr>

      		</table>
      	<div class="row">
      	</div>  

      </div>
      
      <div class="modal-footer">
        <md-button type="button" ng-click="prepareList()" class="btn" style="float:left">Eyða lista</md-button>
        <md-button type="button" ng-show="showRemove" ng-click="removeList( itemList.id )" class="btn" style="float:left">Eyða í alvöru</md-button>
        <md-button type="button" class="btn btn-default" data-dismiss="modal">Close</md-button>
      </div>
    </div>

  </div>
</div>
</md-dialog>