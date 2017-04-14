package gisli.service;

import com.mongodb.*;
import com.mongodb.async.SingleResultCallback;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.*;

import org.springframework.stereotype.Service;

import gisli.model.*;

@Service
public interface MongoService {
	
	public void setUsername( String name );

	public <T> void insert( T o );

	public <T> void save( T o );
	
	public <T> void removeRecipe( String id );

	public void removeWineLogEntry( String id );
	
	public void removeAllRecipes();
	
	public Recipe getRecipe( String id );
	
	public WineLogEntry getWineLogEntry( String id );

	public Recipe getRecipeByName( String name );

	public WineLogEntry getWineLogEntryByName( String name );
	
	public RecipeList getAllRecipes(String username);
	
	public List<WineLogEntry> getWineLog(String username);
	
	public List<Recipe> getAllRecipesAsList(String username);
	
	public User getUser( String username );
	
	public void deleteUser(String id);
	
	public List<User> getUsers();
	
	public ItemList getList( String id );
	
	public List<ItemList> getLists();
	
	public void deleteList(String id);
	
}
