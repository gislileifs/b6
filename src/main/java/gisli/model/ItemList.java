package gisli.model;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lists")
public class ItemList {
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public ArrayList<List> getItems() {
		return items;
	}
	public void setItems(ArrayList<List> items) {
		this.items = items;
	}
	@Id
	String id;
	
	String name;
	Date date;
	String text;
	ArrayList<List> items;
}
