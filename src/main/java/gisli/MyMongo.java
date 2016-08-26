package gisli;

import com.mongodb.*;
import com.mongodb.async.SingleResultCallback;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.*;

import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.mongodb.Mongo;

import gisli.model.*;
import gisli.configuration.MongoConfig;

//@Repository
public class MyMongo {

	ApplicationContext ctx = new AnnotationConfigApplicationContext(MongoConfig.class);
	MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

	public String test() {
	  try{
		mongoOperation.insert(new Test("Joe", "xyz"));
	  }
	  catch( Exception e ) {
		  System.out.println( "Allt í fokki, " + e.getMessage() );
	  }
	
	  return "ok";
	}

	public <T> void insert( T o ) {
		System.out.println( "Mongo insert: " + o.toString() );
		mongoOperation.insert( o );;
	}

	public <T> void save( T o ) {
		System.out.println( "Mongo save: " + o.toString() );
		mongoOperation.save( o );;
	}
	
	public <T> void removeRecipe( String id ) {
		Query query = new Query(Criteria.where("_id").is(id));
		mongoOperation.remove( query, Recipe.class );
	}

	public void removeWineLogEntry( String id ) {
		Query query = new Query(Criteria.where("_id").is(id));
		mongoOperation.remove( query, WineLogEntry.class );
	}
	
	public void removeAllRecipes() {
		Query query = new Query(Criteria.where("_id").is("x"));
		mongoOperation.remove( query, Recipe.class );
	}
	
	public Recipe getRecipe( String id ) {
		Query query = new Query(Criteria.where("_id").is(id));
		Recipe r = mongoOperation.findOne( query, Recipe.class );
		return r;
	}
	
	public WineLogEntry getWineLogEntry( String id ) {
		Query query = new Query(Criteria.where("_id").is(id));
		WineLogEntry r = mongoOperation.findOne( query, WineLogEntry.class );
		return r;
	}

	public Recipe getRecipeByName( String name ) {
		Query query = new Query(Criteria.where("name").is(name));
		Recipe r = mongoOperation.findOne( query, Recipe.class );
		return r;
	}

	public WineLogEntry getWineLogEntryByName( String name ) {
		Query query = new Query(Criteria.where("name").is(name));
		WineLogEntry r = mongoOperation.findOne( query, WineLogEntry.class );
		return r;
	}
	
	public RecipeList getAllRecipes() {
		RecipeList result = new RecipeList();
		List<Recipe> recipes = getAllRecipesAsList();
		result.add(recipes);
		return result;
	}
	
	public List<WineLogEntry> getWineLog() {
		Query q = new Query().with(new Sort(Sort.Direction.DESC, "date"));
		List<WineLogEntry> wineLog = mongoOperation.find(q, WineLogEntry.class);
		return wineLog  ;
	}
	
	public List<Recipe> getAllRecipesAsList() {
		List<Recipe> recipes = mongoOperation.findAll(Recipe.class);
		return recipes;
	}
	
	public User getUser( String username ) {
		Query query = new Query(Criteria.where("username").is(username));
		User u = mongoOperation.findOne( query, User.class );
		return u;
	}
}
