<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page session="true"%>
<html>
<head>
<title>Login Page</title>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>

<style>
.error {
	padding: 15px;
	margin-bottom: 20px;
	border: 1px solid transparent;
	border-radius: 4px;
	color: #a94442;
	background-color: #f2dede;
	border-color: #ebccd1;
}

.msg {
	padding: 15px;
	margin-bottom: 20px;
	border: 1px solid transparent;
	border-radius: 4px;
	color: #31708f;
	background-color: #d9edf7;
	border-color: #bce8f1;
}

#login-box {
	width: 300px;
	padding: 20px;
	margin: 100px auto;
	background: #fff;
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	border: 1px solid #000;
}
</style>
	<meta charset="utf-8"/>
	<spring:url value="/css" var="styleUrl" />
	<link href="resources/css/main.css" rel="stylesheet"/>
	<link href="resources/bootstrap/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet"/>
	<link href="resources/bootstrap/bower_components/metisMenu/dist/metisMenu.css" rel="stylesheet"/>
	<link href="resources/dist/css/sb-admin-2.css" rel="stylesheet"/>
	<link href="resources/css/morris.css" rel="stylesheet"/>
	<link href="resources/bootstrap/bower_components/font-awesome/css/font-awesome.css" rel="stylesheet"/>
	<link href="resources/dist/css/timeline.css" rel="stylesheet"/>
	<script src="resources/jquery/dist/jquery.js" type="text/javascript"><!-- required for FF3 and Opera --></script>	
</head>
<body onload='document.loginForm.username.focus();' class="angularAppBody">

	<div class="container" id="login-boxy">
		<div class="row">
			<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 col-md-offset-4" >			
               <div class="login-panel panel panel-default">		
                  <div class="panel-heading">
                      <h3 class="panel-title">Please Sign In</h3>
                  </div>	
                    <div class="panel-body">

		<c:if test="${not empty error}">
			<div class="error">${error}</div>
		</c:if>
		<c:if test="${not empty msg}">
			<div class="msg">${msg}</div>
		</c:if>

		<c:url var="loginUrl" value="/login" />
		<form name='loginForm'
		  action="login" method='POST'>
		<fieldset>
			<div class="form-group">
				<input class="form-control" placeholder="Username" type='text' name='username'>
			</div>
			<div class="form-group">
				<input class="form-control" placeholder="password" type='password' name='password' />
			</div>
				<!-- if this is login for update, ignore remember me check -->
	<c:if test="${empty loginUpdate}">
	<div class="form-group">
		Remember Me: <input type="checkbox" name="remember-me" checked/>
	</div>
	</c:if>
			<div>
				<input class="btn btn-lg btn-block" name="submit" type="submit"
				  value="Login" /></td>
			</div>

		  <input type="hidden" name="${_csrf.parameterName}"
			value="${_csrf.token}" />
			</fieldset>
		</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<spring:url value="resources/js/main.js" var="main_js" />	
	<script src="${main_js}" type="text/javascript"><!-- required for FF3 and Opera --></script>
	<script src="resources/bootstrap/bower_components/bootstrap/dist/js/bootstrap.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
	<script src="resources/bootstrap/bower_components/metisMenu/dist/metisMenu.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
	<script src="resources/bootstrap/bower_components/morrisjs/morris.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
	<script src="resources/bootstrap/bower_components/raphael/raphael.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
	<script src="resources/dist/js/sb-admin-2.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
	<script src="resources/js/morris-data.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
	<script src="resources/js/d3.js" type="text/javascript"><!-- required for FF3 and Opera --></script>
</body>
</html>