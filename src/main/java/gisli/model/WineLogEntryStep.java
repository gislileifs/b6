package gisli.model;

import java.util.Date;

public class WineLogEntryStep {
	Date date;
	String text;
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
