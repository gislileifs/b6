package gisli.controller;

import java.util.List;

import gisli.service.ListService;
import gisli.model.ItemList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ListRestController {

	@Autowired
	ListService listService;
	
	@RequestMapping(value = "list/", method = RequestMethod.GET)
	public List<ItemList> getlists() {
		return listService.getLists();
	}
	
	@RequestMapping(value = "list/", method = RequestMethod.POST)
	public void saveList(@RequestBody ItemList list) {
		listService.saveList(list);
	}	
	
	@RequestMapping(value = "list/{id}", method = RequestMethod.GET)
	public ItemList saveList(@RequestParam String id) {
		return listService.getList(id);
	}	

	@RequestMapping(value = "list/{id}", method = RequestMethod.DELETE)
	public void deleteList(@PathVariable String id) {
		listService.deleteList(id);
	}	
}
