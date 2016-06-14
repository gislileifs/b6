<%@ page contentType="text/html; charset=UTF-8" %>
<div class="row">

<div>
Já, þetta er aðalsíðan
</div>

<div>
Fullt af dóti
</div>

<button onclick="ajaxTest()"> Ajax Test </button>

<button onclick="partialView()"> Partial view test </button>
</div>

<div id="errordiv">
</div>

<script>

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

	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : base + "/partialViewTest",
		//data : JSON.stringify(search),
		dataType : 'json',
		timeout : 100000,
		success : function(data) {
			alert("success");
			alert( JSON.stringify(data) );
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

}


</script>