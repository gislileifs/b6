package gisli.controller;

import java.util.List;

import gisli.MyMongo;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import gisli.model.*;

@Controller
@RequestMapping("/")
public class TilesController {
 
    MyMongo mongo = new MyMongo();

    @RequestMapping(method = RequestMethod.GET)
    public String sayHello(ModelMap model) {
        model.addAttribute("greeting", "Tiles! Spring 4 MVC");
        return "tiles/page1";
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public String dashboard(ModelMap model) {
        model.addAttribute("greeting", "Tiles! Spring 4 MVC");
        
        mongo.test();
        
        return "tiles/page1";
    }

    @RequestMapping(value = "/page2", method = RequestMethod.GET)
    public String page2(ModelMap model) {
        model.addAttribute("greeting", "Tiles! Spring 4 MVC");
        
        Recipe r = new Recipe( "Karrýlamb" );
        mongo.insert(r);
        
        RecipeList recipes = mongo.getAllRecipes();
        model.addAttribute("recipes", recipes );
        
        return "tiles/page2";
    }    
    
    @RequestMapping(value = "/deleteRecipe", method = RequestMethod.GET)
    public String deleteRecipe(ModelMap model, String id) {
        model.addAttribute("greeting", id);
        
		mongo.removeRecipe(id);
        
        RecipeList recipes = mongo.getAllRecipes();
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

    @RequestMapping(value = "/partialViewTest", method = RequestMethod.GET, produces = "text/html" )    
    public String partialViewTest() {
    	return "tiles/page3";
    }
}