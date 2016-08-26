<%@ page contentType="text/html; charset=UTF-8" %>

<div id="mycontent" class="panel panel-default">
</div>

<div ng-app="myApp" class="datepickerdemoBasicUsage" ng-controller="AppCtrl" ng-cloak="">
  <md-content layout-padding="">

    <div layout-gt-xs="row">
      <div flex-gt-xs="">
        <h4>Standard date-picker</h4>
        <md-datepicker ng-model="myDate" md-placeholder="Enter date"></md-datepicker>
      </div>

      <div flex-gt-xs="">
        <h4>Disabled date-picker</h4>
        <md-datepicker ng-model="myDate" md-placeholder="Enter date" disabled=""></md-datepicker>
      </div>
    </div>

    <div layout-gt-xs="row">
      <div flex-gt-xs="">
        <h4>Date-picker with min date and max date</h4>
        <md-datepicker ng-model="myDate" md-placeholder="Enter date" md-min-date="minDate" md-max-date="maxDate"></md-datepicker>
      </div>

      <div flex-gt-xs="">
        <h4>Only weekends are selectable</h4>
        <md-datepicker ng-model="myDate" md-placeholder="Enter date" md-date-filter="onlyWeekendsPredicate"></md-datepicker>
      </div>
    </div>

    <div layout-gt-xs="row">
      <div flex-gt-xs="">
        <h4>Only weekends within given range are selectable</h4>
        <md-datepicker ng-model="myDate" md-placeholder="Enter date" md-min-date="minDate" md-max-date="maxDate" md-date-filter="onlyWeekendsPredicate"></md-datepicker>
      </div>

      <div flex-gt-xs="">
        <h4>Opening the calendar when the input is focused</h4>
        <md-datepicker ng-model="myDate" md-placeholder="Enter date" md-open-on-focus=""></md-datepicker>
      </div>
    </div>

    <div layout-gt-xs="row">
      <form name="myForm" flex-gt-xs="">
        <h4>With ngMessages</h4>
        <md-datepicker name="dateField" ng-model="myDate" md-placeholder="Enter date" required="" md-min-date="minDate" md-max-date="maxDate" md-date-filter="onlyWeekendsPredicate"></md-datepicker>

        <div class="validation-messages" ng-messages="myForm.dateField.$error">
          <div ng-message="valid">The entered value is not a date!</div>
          <div ng-message="required">This date is required!</div>
          <div ng-message="mindate">Date is too early!</div>
          <div ng-message="maxdate">Date is too late!</div>
          <div ng-message="filtered">Only weekends are allowed!</div>
        </div>
      </form>

      <form name="myOtherForm" flex-gt-xs="">
        <h4>Inside a md-input-container</h4>

        <md-input-container>
          <label>Enter date</label>
          <md-datepicker ng-model="myDate" name="dateField" md-min-date="minDate" md-max-date="maxDate"></md-datepicker>

          <div ng-messages="myOtherForm.dateField.$error">
            <div ng-message="valid">The entered value is not a date!</div>
            <div ng-message="required">This date is required!</div>
            <div ng-message="mindate">Date is too early!</div>
            <div ng-message="maxdate">Date is too late!</div>
          </div>
        </md-input-container>
      </form>
    </div>

  </md-content>
</div>


<script>

$(function(){
	//alert( "x" );
});

function d3test() {
	d3.select("#errordiv").append("span")
    .text("Hello, D3 world!");
};

function ajaxTest() {
	var search = {}
	search["username"] = $("#username").val();
	search["email"] = $("#email").val();

	var base = "${pageContext.request.contextPath}";

	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : base + "/ajaxTest",
		//data : JSON.stringify(search),
		dataType : 'json',
		timeout : 100000,
		success : function(data) {
			alert( data.name );
		},
		error : function(e) {
			alert( e );
		},
		done : function(e) {
			//console.log("DONE");
			//enableSearchButton(true);
		}
	});

}

function partialView() {

	var base = "${pageContext.request.contextPath}";
	$.get( base + "/partialViewTest", {param: "myval", other: "otherVal"}, function(data) {
		$("#ajaxOutput").html(data);
		});
/*
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : base + "/partialViewTest",
		data : {param: "theValue"},
		//dataType : 'json',
		timeout : 100000,
		success : function(data) {
//			alert( JSON.stringify(data) );
			$("#ajaxOutput").html(data);
		},
		error : function(e) {
			alert("error");
			alert( JSON.stringify(e) );
			$("#errordiv").html(JSON.stringify(e));
		},
		done : function(e) {
			//console.log("DONE");
			//enableSearchButton(true);
		}
	});
*/
}


</script>