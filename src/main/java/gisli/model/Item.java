package gisli.model;

import java.util.Date;

public class Item {
	Date date;
	String text;
	
	public Item() {
		date = null;
		text = null;
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
}
