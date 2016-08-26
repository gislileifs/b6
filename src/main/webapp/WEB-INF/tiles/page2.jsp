<%@ page contentType="text/html; charset=UTF-8" %>
<div class="row">

Hér er síða 2
<p>
${greeting}

${recipes}

</div>

<script>

	function editRecipe( id ) {
		alert( id );
	}

	function getRecipe( id ) {
		$.get( "recipe/" + id, function(data) {
			alert(data);
			});
	}

</script>