package gisli.service;

import gisli.MyMongo;
import gisli.model.ItemList;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("listService")
@Transactional
public class ListServiceImpl implements ListService {
	
	MyMongo mongo = new MyMongo();
	
	@Override
	public void saveList(ItemList il) {
		// TODO Auto-generated method stub
		mongo.save(il);
	}

	@Override
	public ItemList getList(String id) {
		// TODO Auto-generated method stub
		return mongo.getList(id);
	}

	@Override
	public List<ItemList> getLists() {
		// TODO Auto-generated method stub
		return mongo.getLists();
	}

	@Override
	public void deleteList(String id) {
		// TODO Auto-generated method stub
		mongo.deleteList(id);
	}

}
