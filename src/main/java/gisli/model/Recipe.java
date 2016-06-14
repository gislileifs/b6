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
	ArrayList<String> ingredients;
	ArrayList<String> steps;
	String url;
	
	public ArrayList<String> getSteps() {
		return steps;
	}

	public void setSteps(ArrayList<String> steps) {
		this.steps = steps;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setIngredients(ArrayList<String> ingredients) {
		this.ingredients = ingredients;
	}

	public Recipe() {
		
	}
	
	public Recipe( String name ) {
		this.name = name;
	}
	
	public String toString() {
		String str = "<div style='margin-bottom: 20px'>";
		str += "<p>Name: " + name + "</p>";
		str += "<p>Type: " + type + "</p>";
		str += "<a href='deleteRecipe?id=" + id + "'>Delete</a>";
		str += "<a href='ajaxTest'> Test </a>";
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
	public List<String> getIngredients() {
		return ingredients;
	}
	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}
}
