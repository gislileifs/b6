package gisli.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "wineLog")
public class WineLogEntry {
	@Id
	String id;
	
	String name;
	String type;
	Date date;
	
	String username;
	
	public void setUsername( String name ) {
		username = name;
	}
	
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	Double sugar;
	public Double getSugar() {
		return sugar;
	}

	public void setSugar(Double sugar) {
		this.sugar = sugar;
	}

	Recipe recipe;
	Double initialGravity;
	Double finalGravity;
	public Double getFinalGravity() {
		return finalGravity;
	}

	public void setFinalGravity(Double finalGravity) {
		this.finalGravity = finalGravity;
	}

	public Double getInitialGravity() {
		return initialGravity;
	}

	public void setInitialGravity(Double initialGravity) {
		this.initialGravity = initialGravity;
	}

	WineLogEntryStep[] steps;
	
	public String getId() {
		return id;
	}
	
	public void setId( String id ) {
		this.id = id;
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
	public Recipe getRecipe() {
		return recipe;
	}
	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}
	public WineLogEntryStep[] getSteps() {
		return steps;
	}
	public void setSteps(WineLogEntryStep[] steps) {
		this.steps = steps;
	}
	
	public WineLogEntry( String name, String type ) {
		this.name = name;
		this.type = type;
	}
	
	public WineLogEntry() {
		
	}
	
	public String toString() {
		String str = "Name: " + name;
		for( WineLogEntryStep s : steps )
			str += s.getDate() + "\n";
		return str;
	}
}
