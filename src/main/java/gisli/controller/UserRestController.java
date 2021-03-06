package gisli.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gisli.configuration.SecurityConfig;
import gisli.model.User;
import gisli.model.WineLogEntry;
import gisli.service.UserService;

@RestController
public class UserRestController {
	private static final Logger logger = Logger.getLogger(UserRestController.class);
	
	@Autowired
	UserService userService;
	
    @RequestMapping(value = "/user", method = RequestMethod.POST)
	public void saveUser( @RequestBody User user ) {
    	logger.debug( "Saving user: " + user.toString() );
		userService.saveUser(user);
	}
	
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public User getUser(@RequestParam String id) {
		return userService.getUser(id);
	}
	
    @RequestMapping(value = "/user/", method = RequestMethod.GET)
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
    
    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String id) {
    	userService.deleteUser(id);
    }
	
}
