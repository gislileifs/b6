<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
	<meta charset="utf-8"/>
	<!-- meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" -->
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<spring:url value="/css" var="styleUrl" />
	<link href="resources/bootstrap/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet"/>
	<link href="resources/bootstrap/bower_components/font-awesome/css/font-awesome.css" rel="stylesheet"/>
	<link href="resources/css/angular-material.min.css" rel="stylesheet"/>
	<link href="resources/css/main.css" rel="stylesheet"/>
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> 	
	 
	<script src="resources/jquery/dist/jquery.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
	
        <script src="resources/js/angular/dist/angular.js"><!--xx--></script>
	  <script src="resources/js/angular/dist/angular-animate.js"><!--xx--></script>
  <script src="resources/js/angular/dist/angular-aria.js"><!--xx--></script>
  <script src="resources/js/angular/dist/angular-messages.js"><!--xx--></script>
  <script src="resources/js/angular/dist/svg-assets-cache.js"><!--xx--></script>
  <script src="resources/js/angular/dist/angular-material.js"><!--xx--></script>
  <script src="resources/js/moment.js"><!--xx--></script>      
      <script src="resources/js/angular/app.js"><!--xx--></script>      
      <script src="resources/js/angular/recipeService.js"><!--xx--></script>
      <script src="resources/js/angular/recipeController.js"><!--xx--></script>
      <script src="resources/js/angular/wineService.js"><!--xx--></script>
      <script src="resources/js/angular/wineController.js"><!--xx--></script>
      <script src="resources/js/angular/userService.js"><!--xx--></script>
      <script src="resources/js/angular/userController.js"><!--xx--></script>
      <script src="resources/js/angular/listController.js"><!--xx--></script>
      <script src="resources/js/angular/listService.js"><!--xx--></script>

</head>
<body my-document-click='' class="angularAppBody">

<div id="mycontent" class="panel panel-default">
</div>

<div ng-app="myApp" class="sidenavdemoBasicUsage" ng-controller="NavCtrl" layout="column"  ng-cloak="">

  <section layout="row" flex layout-fill>

    <md-sidenav class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia('gt-md')" md-whiteframe="4">

      <md-toolbar class="md-theme-indigo">
        <h1 class="md-toolbar-tools"></h1>
      </md-toolbar>
      
      <md-content layout-padding="" ng-controller="LeftCtrl">
      <div layout="column">
        <md-button ng-click="close()" class="md-primary row" hide-gt-md="">
          Close Sidenav Left
        </md-button class="row">
        <md-button ng-click="showRecipes()">
        	Uppskriftir
        </md-button class="navButton">
        <md-button ng-click="showWinelog()" >
        	Víngerðardagbók
        </md-button class="row">   
        <md-button ng-click="showLists()">
        	Listar
        </md-button class="row">   
        <md-button ng-click="showUsers()">
        	Notendur
        </md-button class="row">   
        <a class="md-button" href="javascript:formSubmit()">
         Skrá út: ${pageContext.request.userPrincipal.name}
         </a>
        <p hide="" show-gt-md="">
          This sidenav is locked open on your device. To go back to the default behavior,
          narrow your display.
        </p>
        </div>
      </md-content>

    </md-sidenav>

    <md-content flex="" layout-padding="">
    
        <md-button ng-click="toggleLeft()" class="md-primary" style="margin:0px; padding: 0px" hide-gt-md="">
        <i class="material-icons">view_headline</i>    
        </md-button>
    
    <div class="slide-animate-container">
    <div class="slide-animate" ng-include="template"></div>
    </div>

      <div layout="column" layout-align="top center">
        <p>
        The left sidenav will 'lock open' on a medium (=960px wide) device.
        </p>
        <p>
        The right sidenav will focus on a specific child element.
        </p>



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
<form action="logout" method="post" id="logoutForm">
		<input type="hidden" name="${_csrf.parameterName}"
			value="${_csrf.token}" />
	</form>

</div>
</body>
</html>

<!--
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
-->
<script>

function formSubmit() {
	document.getElementById("logoutForm").submit();
}


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



</script>