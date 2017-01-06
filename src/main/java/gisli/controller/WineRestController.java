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

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import gisli.model.Recipe;
import gisli.model.WineLogEntry;
import gisli.service.WineService;
  
@RestController
public class WineRestController {
  
    @Autowired
    WineService wineService;  //Service which will do all data retrieval/manipulation work
  
     
    //-------------------Retrieve All Users--------------------------------------------------------
      
    @RequestMapping(value = "/winelog/", method = RequestMethod.GET)
    public ResponseEntity<List<WineLogEntry>> listAllWineLogEntries() {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	
        List<WineLogEntry> wl = wineService.findAllLogEntries(auth.getName());
        if(wl.isEmpty()){
            return new ResponseEntity<List<WineLogEntry>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<WineLogEntry>>(wl, HttpStatus.OK);
    }
  
  
     
    //-------------------Retrieve Single User--------------------------------------------------------
      
    @RequestMapping(value = "/winelog/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WineLogEntry> getWineLogEntry(@PathVariable("id") String id) {
        System.out.println("Fetching User with id " + id);
        WineLogEntry wle = wineService.findById(id);
        if (wle == null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<WineLogEntry>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<WineLogEntry>(wle, HttpStatus.OK);
    }
  
      
      
    //-------------------Create a User--------------------------------------------------------
      
    @RequestMapping(value = "/winelog/", method = RequestMethod.POST)
    public ResponseEntity<Void> createWineLogEntry(@RequestBody WineLogEntry entry,    UriComponentsBuilder ucBuilder) {
        System.out.println("Creating wine log entry " + entry.toString());
  
        if (wineService.doesLogEntryExist(entry)) {
            //System.out.println("A recipe with name " + recipe.getName() + " already exists");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
  
        wineService.saveLogEntry(entry);
  
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/winelog/{id}").buildAndExpand(entry.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
  
     
      
    //------------------- Update a User --------------------------------------------------------
      
    @RequestMapping(value = "/winelog/{id}", method = RequestMethod.PUT)
    public ResponseEntity<WineLogEntry> updateWineLogEntry(@PathVariable("id") String id, @RequestBody WineLogEntry wle) {
        System.out.println("Updating winelog " + id);
          
        WineLogEntry currentEntry = wineService.findById(id);
          
        if (currentEntry==null) {
            System.out.println("Recipe with id " + id + " not found");
            return new ResponseEntity<WineLogEntry>(HttpStatus.NOT_FOUND);
        }
  
        currentEntry.setName(wle.getName());
        currentEntry.setType(wle.getType());
        currentEntry.setInitialGravity(wle.getInitialGravity());
        currentEntry.setFinalGravity(wle.getFinalGravity());
        currentEntry.setDate(wle.getDate());
        currentEntry.setSteps( wle.getSteps() );
        currentEntry.setSugar( wle.getSugar());
          
        wineService.updateLogEntry(currentEntry);
        return new ResponseEntity<WineLogEntry>(currentEntry, HttpStatus.OK);
    }
  
     
     
    //------------------- Delete a User --------------------------------------------------------
      
    @RequestMapping(value = "/winelog/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<WineLogEntry> deleteWineLogEntry(@PathVariable("id") String id) {
        System.out.println("Fetching & Deleting log entry with id " + id);
  
        WineLogEntry entry = wineService.findById(id);
        if (entry == null) {
            System.out.println("Unable to delete. wine log entry with id " + id + " not found");
            return new ResponseEntity<WineLogEntry>(HttpStatus.NOT_FOUND);
        }
  
        wineService.deleteLogEntryById(id);
        return new ResponseEntity<WineLogEntry>(HttpStatus.NO_CONTENT);
    }
  
      
     
    //------------------- Delete All Users --------------------------------------------------------
      
    @RequestMapping(value = "/winelog/", method = RequestMethod.DELETE)
    public ResponseEntity<WineLogEntry> deleteWineLog() {
        System.out.println("Deleting All Users");
  
        wineService.deleteAllLogEntries();
        return new ResponseEntity<WineLogEntry>(HttpStatus.NO_CONTENT);
    }
  
}