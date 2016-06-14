package gisli.model;

import java.util.ArrayList;
import java.util.List;

public class RecipeList extends ArrayList {
	ArrayList<Recipe> list;
	
	public RecipeList() {
		list = new ArrayList<Recipe>();
	}
	
	public void add( Recipe r ) {
		if( list == null ) {
			list = new ArrayList<Recipe>();
		}
		list.add(r);
	}
	
	public void add( List<Recipe> l ) {
		if( list == null ) {
			list = new ArrayList<Recipe>();
		}
		list.addAll(l);
	}
	
	public String toString() {
		String result = "";
		
		if( list != null ) {
			for( Recipe r : list ) {
				result += r.toString() + "<br>";
			}
		}
		
		return result;
	}
}
