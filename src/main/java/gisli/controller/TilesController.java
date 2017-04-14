package gisli.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import gisli.model.*;
import gisli.service.MongoService;

@Controller
@RequestMapping("/")
public class TilesController {
 
	@Autowired
	MongoService mongo;

    @RequestMapping(method = RequestMethod.GET)
    public String sayHello(ModelMap model) {
        model.addAttribute("greeting", "Tiles! Spring 4 MVC");
        return "angularApp";
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public String dashboard(ModelMap model) {
        model.addAttribute("greeting", "Tiles! Spring 4 MVC");
        
        //mongo.test();
        
        return "tiles/page1";
    }

    @RequestMapping(value = "/page2", method = RequestMethod.GET)
    public String page2(ModelMap model) {
        model.addAttribute("greeting", "Tiles! Spring 4 MVC");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        RecipeList recipes = mongo.getAllRecipes(auth.getName());
        model.addAttribute("recipes", recipes );
        
        return "tiles/page2";
    }    
    
    @RequestMapping(value = "/winelog", method = RequestMethod.GET)
    public String winelog(ModelMap model) {
        model.addAttribute("greeting", "Tiles! Spring 4 MVC");
        
        return "tiles/winelog";
    }    

    @RequestMapping(value = "/winerecipes", method = RequestMethod.GET)
    public String wineRecipes(ModelMap model) {
        return "tiles/winerecipes";
    }    

    @RequestMapping(value = "/ang", method = RequestMethod.GET)
    public String angularApp(ModelMap model) {
        return "angularApp";
    }    
    
    @RequestMapping(value = "/todo", method = RequestMethod.GET)
    public String toDo(ModelMap model) {
        return "tiles/todo";
    }    
    
    @RequestMapping(value = "/deleteRecipe", method = RequestMethod.GET)
    public String deleteRecipe(ModelMap model, String id) {
        model.addAttribute("greeting", id);
        
		mongo.removeRecipe(id);

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        RecipeList recipes = mongo.getAllRecipes(auth.getName());
        model.addAttribute("recipes", recipes );
        
        return "tiles/page2";
    }    
    
    @RequestMapping(value = "/page3", method = RequestMethod.GET)
    public String page3(ModelMap model) {
        model.addAttribute("greeting", "Form submission");
                
        return "tiles/page3";
    }   
    
    @RequestMapping(value = "/helloagain", method = RequestMethod.GET)
    public String sayHelloAgain(ModelMap model) {
        model.addAttribute("greeting", "Hello World Again, from Spring 4 MVC");
        return "welcome";
    }

    @RequestMapping(value = "/addRecipe", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
    public String addRecipe(@ModelAttribute Recipe recipe, ModelMap model) {
        model.addAttribute("greeting", recipe.getType());
        
        mongo.insert( recipe );
        
        return "tiles/page3";
    }

    @RequestMapping(value = "/partialViewTest", method = RequestMethod.GET)    
    public String partialViewTest( String param, String other, ModelMap model ) {
    	model.addAttribute("myparam", param);
    	model.addAttribute("other", other);
    	model.addAttribute("testparam", "testvalue");
    	return "test";
    }
    
    @RequestMapping(value = "/angularView", method = RequestMethod.GET)    
    public String angularView( ModelMap model ) {
    	return "tiles/angularView";
    }
    
    @RequestMapping(value = "/recipe/{id}", method = RequestMethod.GET)    
    public String recipeView( @PathVariable("id") String id, ModelMap model) {
    	Recipe r = mongo.getRecipe(id);
    	model.addAttribute("recipe", r);
    	return "recipe";
    }
}