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

import gisli.model.Test;

import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.mongodb.Mongo;

import gisli.model.*;
import gisli.configuration.MongoConfig;

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
		mongoOperation.insert( o );;
	}
	
	public <T> void removeRecipe( String id ) {
		Query query = new Query(Criteria.where("_id").is(id));
		mongoOperation.remove( query, Recipe.class );
	}
	
	public RecipeList getAllRecipes() {
		RecipeList result = new RecipeList();
		List<Recipe> recipes = mongoOperation.findAll(Recipe.class);
		result.add(recipes);
		return result;
	}
}
