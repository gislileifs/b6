package gisli.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lists")
public class ItemList {
	
	public ItemList() {
		items = new ArrayList<Item>();
	}
	
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

	@Id
	String id;
	String parent;
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public void setItems(ArrayList<Item> items) {
		this.items = items;
	}
	public ArrayList<Item> getItems() {
		return this.items;
	}
	
	String name;
	Date date;
	String text;
	ArrayList<Item> items;
	
}
