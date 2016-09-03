<%@ page contentType="text/html; charset=UTF-8" %>

<div id="mycontent" class="panel panel-default">
</div>

<div ng-app="myApp" class="sidenavdemoBasicUsage" ng-controller="NavCtrl" layout="column" style="height:500px;" ng-cloak="">

  <section layout="row" flex="">

    <md-sidenav class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia('gt-md')" md-whiteframe="4">

      <md-toolbar class="md-theme-indigo">
        <h1 class="md-toolbar-tools">Sidenav Left</h1>
      </md-toolbar>
      <md-content layout-padding="" ng-controller="LeftCtrl">
        <md-button ng-click="close()" class="md-primary" hide-gt-md="">
          Close Sidenav Left
        </md-button>
        <p hide="" show-gt-md="">
          This sidenav is locked open on your device. To go back to the default behavior,
          narrow your display.
        </p>
      </md-content>

    </md-sidenav>

    <md-content flex="" layout-padding="">

      <div layout="column" layout-align="top center">
        <p>
        The left sidenav will 'lock open' on a medium (=960px wide) device.
        </p>
        <p>
        The right sidenav will focus on a specific child element.
        </p>

        <div>
          <md-button ng-click="toggleLeft()" class="md-primary" hide-gt-md="">
            Toggle left
          </md-button>
        </div>

        <div>
          <md-button ng-click="toggleRight()" ng-hide="isOpenRight()" class="md-primary">
            Toggle right
          </md-button>
        </div>
      </div>

      <div flex=""></div>

    </md-content>

    <md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="right">

      <md-toolbar class="md-theme-light">
        <h1 class="md-toolbar-tools">Sidenav Right</h1>
      </md-toolbar>
      <md-content ng-controller="RightCtrl" layout-padding="">
        <form>
          <md-input-container>
            <label for="testInput">Test input</label>
            <input id="testInput" ng-model="data" md-autofocus="" type="text">
          </md-input-container>
        </form>
        <md-button ng-click="close()" class="md-primary">
          Close Sidenav Right
        </md-button>
      </md-content>

    </md-sidenav>

  </section>

</div>

<!--
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
-->

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