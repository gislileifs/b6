package gisli.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gisli.model.*;

@RestController
public class AjaxController {

    @RequestMapping(value = "/ajaxTest", method = RequestMethod.GET)
	public Recipe test() {
		Recipe r = new Recipe();
		r.setName("ajax");
		r.setType("ajaxtype");
		return r;
	}
	
}
