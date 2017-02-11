package gisli.service;

import java.util.List;

import gisli.model.ItemList;

public interface ListService {

	public void saveList(ItemList il);
	
	public ItemList getList(String id);
	
	public List<ItemList> getLists();
	
	public void deleteList(String id);
}
