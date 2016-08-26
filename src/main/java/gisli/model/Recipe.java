package gisli.model;

import java.util.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipes")
public class Recipe {

	@Id
	String id;
	
	String name;
	String type;
	String[] ingredients;
	String[] steps;
	String url;
	
	public String getId() {
		return id;
	}
	
	public String[] getSteps() {
		return steps;
	}

	public void setSteps(String[] steps) {
		this.steps = steps;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Recipe() {
		
	}
	
	public Recipe( String name ) {
		this.name = name;
	}
	
	public String toString() {
		String str = "<div id='display" + id + "' style='margin-bottom: 20px'>";
		str += "<p>Name: " + name + "</p>";
		str += "<p>Type: " + type + "</p>";
		str += "<a href='deleteRecipe?id=" + id + "'>Delete</a><p>";
		str += "<a href='#' onclick='editRecipe(\"" + id + "\")'> Edit </a>";
		str += "<a href='#' onclick='getRecipe(\"" + id + "\")'> GetResipe </a>";
		str += "<a href='ajaxTest'> Test </a>";
		str += "</div>";
		str += "<div if='edit" + id + "'>";
		str += "Edit fields";
		str += "</div>";
		return str;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String[] getIngredients() {
		return ingredients;
	}
	public void setIngredients(String[] ingredients) {
		this.ingredients = ingredients;
	}
}
