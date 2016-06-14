<%@ page contentType="text/html; charset=UTF-8" %>
<div class="row">

Hér er síða 3
<p>
${greeting}

<form method="post" action="addRecipe" accept-charset="UTF-8" >
	<input type="text" name="Name" placeholder="Name" class="form-control"/>
	<input type="text" name="Type" placeholder="Type" class="form-control"/>
	<input type="submit" value="Svve"/>
</form>

</div>