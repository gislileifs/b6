package gisli.controller;

import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
 
import gisli.model.Recipe;
import gisli.service.RecipeService;
  
@RestController
public class RecipeRestController {
  
    @Autowired
    RecipeService recipeService;  //Service which will do all data retrieval/manipulation work
  
     
    //-------------------Retrieve All Users--------------------------------------------------------
      
    @RequestMapping(value = "/recipe/", method = RequestMethod.GET)
    public ResponseEntity<List<Recipe>> listAllRecipes() {
        List<Recipe> recipes = recipeService.findAllRecipes();
        if(recipes.isEmpty()){
            return new ResponseEntity<List<Recipe>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Recipe>>(recipes, HttpStatus.OK);
    }
  
  
     
    //-------------------Retrieve Single User--------------------------------------------------------
      
    @RequestMapping(value = "/recipe/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Recipe> getRecipe(@PathVariable("id") String id) {
        System.out.println("Fetching User with id " + id);
        Recipe recipe = recipeService.findById(id);
        if (recipe == null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<Recipe>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Recipe>(recipe, HttpStatus.OK);
    }
  
      
      
    //-------------------Create a User--------------------------------------------------------
      
    @RequestMapping(value = "/recipe/", method = RequestMethod.POST)
    public ResponseEntity<Void> createRecipe(@RequestBody Recipe recipe,    UriComponentsBuilder ucBuilder) {
        System.out.println("Creating Recipe " + recipe.getName());
  
        if (recipeService.doesRecipeExist(recipe)) {
            System.out.println("A recipe with name " + recipe.getName() + " already exists");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
  
        recipeService.saveRecipe(recipe);
  
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/recipe/{id}").buildAndExpand(recipe.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
  
     
      
    //------------------- Update a User --------------------------------------------------------
      
    @RequestMapping(value = "/recipe/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Recipe> updateRecipe(@PathVariable("id") String id, @RequestBody Recipe recipe) {
        System.out.println("Updating recipe " + id);
          
        Recipe currentRecipe = recipeService.findById(id);
          
        if (currentRecipe==null) {
            System.out.println("Recipe with id " + id + " not found");
            return new ResponseEntity<Recipe>(HttpStatus.NOT_FOUND);
        }
  
        currentRecipe.setName(recipe.getName());
        currentRecipe.setType(recipe.getType());
        currentRecipe.setUrl(recipe.getUrl());;
        currentRecipe.setIngredients( recipe.getIngredients() );
        currentRecipe.setSteps( recipe.getSteps() );
          
        recipeService.updateRecipe(currentRecipe);
        return new ResponseEntity<Recipe>(currentRecipe, HttpStatus.OK);
    }
  
     
     
    //------------------- Delete a User --------------------------------------------------------
      
    @RequestMapping(value = "/recipe/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Recipe> deleteRecipe(@PathVariable("id") String id) {
        System.out.println("Fetching & Deleting User with id " + id);
  
        Recipe recipe = recipeService.findById(id);
        if (recipe == null) {
            System.out.println("Unable to delete. recipe with id " + id + " not found");
            return new ResponseEntity<Recipe>(HttpStatus.NOT_FOUND);
        }
  
        recipeService.deleteRecipeById(id);
        return new ResponseEntity<Recipe>(HttpStatus.NO_CONTENT);
    }
  
      
     
    //------------------- Delete All Users --------------------------------------------------------
      
    @RequestMapping(value = "/recipe/", method = RequestMethod.DELETE)
    public ResponseEntity<Recipe> deleteAllRecipes() {
        System.out.println("Deleting All Users");
  
        recipeService.deleteAllRecipes();
        return new ResponseEntity<Recipe>(HttpStatus.NO_CONTENT);
    }
  
}