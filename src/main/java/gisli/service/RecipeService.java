package gisli.service;

import java.util.List;
 
import gisli.model.Recipe;
 
public interface RecipeService {
     
    Recipe findById(String id);
     
    Recipe findByName(String name);
     
    void saveRecipe(Recipe recipe);
     
    void updateRecipe(Recipe recipe);
     
    void deleteRecipeById(String id);
 
    List<Recipe> findAllRecipes(); 
     
    void deleteAllRecipes();
     
    public boolean doesRecipeExist(Recipe recipe);
     
}