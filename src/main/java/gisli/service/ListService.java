package gisli.service;

import gisli.model.ItemList;

public interface ListService {

	public void saveItemList(ItemList il);
	
	public ItemList getList(String id);
	
	public void deleteList(String id);
}
