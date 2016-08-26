package gisli.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gisli.MyMongo;
import gisli.model.Recipe;
 
@Service("recipeService")
@Transactional
public class RecipeServiceImpl implements RecipeService{
	
	MyMongo mongo = new MyMongo(); 
	
    private static final AtomicLong counter = new AtomicLong();
     
//    private static List<Recipe> recipes;
 
    public List<Recipe> findAllRecipes() {
    	//System.out.println( "findAllRecipes!" );
        return mongo.getAllRecipesAsList();
    }
     
    public Recipe findById(String id) {
    	//System.out.println( "findById - " + id );
    	Recipe r = mongo.getRecipe(id);
    	return r;
    }
     
    public Recipe findByName(String name) {
    	return mongo.getRecipeByName(name);
    }
     
    public void saveRecipe(Recipe recipe) {
    	System.out.println("saveRecipe. steps: " + recipe.getSteps() );
    	mongo.insert(recipe);;
    }
 
    public void updateRecipe(Recipe recipe) {
    	System.out.println("updateRecipe. Name: " + recipe.getName() + " steps: " + recipe.getSteps() );
    	String[] ing = recipe.getIngredients();
    	if( ing != null ) {
    		for( String s : ing )
    			System.out.println( "Ing: " + s + "\n");
    	}
    	mongo.save(recipe);
    }
 
    public void deleteRecipeById(String id) {
         mongo.removeRecipe(id);;
    }
 
    public boolean doesRecipeExist(Recipe recipe) {
    	Recipe r = mongo.getRecipe(recipe.getId());
    	return r != null;
    }
     
    public void deleteAllURecipes(){
        mongo.removeAllRecipes();
    }
 
    private List<Recipe> populateRecipes(){
        List<Recipe> recipes = mongo.getAllRecipesAsList();
        return recipes;
    }

	@Override
	public void deleteAllRecipes() {
		// TODO Auto-generated method stub
		
	}
 
}