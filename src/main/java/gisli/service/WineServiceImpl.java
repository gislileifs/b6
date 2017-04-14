package gisli.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gisli.MyMongo;
import gisli.model.WineLogEntry;
 
@Service("wineService")
@Transactional
public class WineServiceImpl implements WineService{
	
	@Autowired
	MongoService mongo;
	
    private static final AtomicLong counter = new AtomicLong();
     
//    private static List<Recipe> recipes;
 
    public List<WineLogEntry> findAllLogEntries(String username) {
    	//System.out.println( "findAllRecipes!" );
        return mongo.getWineLog(username);
    }
     
    public WineLogEntry findById(String id) {
    	//System.out.println( "findById - " + id );
    	WineLogEntry r = mongo.getWineLogEntry(id);
    	//WineLogEntry wle = (WineLogEntry)mongo.get(id);
    	return r;
    }
     
    public WineLogEntry findByName(String name) {
    	return mongo.getWineLogEntryByName(name);
    }
     
    public void saveLogEntry(WineLogEntry wle) {
    	System.out.println("WineServiceImpl: saveWineLogEntry. steps: " + wle.getSteps() );
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	wle.setUsername(auth.getName());
    	mongo.insert(wle);;
    }
 
    public void updateLogEntry(WineLogEntry wle) {
    	//System.out.println("updateWLE. Name: " + recipe.getName() + " steps: " + recipe.getSteps() );
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	wle.setUsername(auth.getName());
    	mongo.save(wle);
    }
 
    public void deleteLogEntryById(String id) {
         mongo.removeWineLogEntry(id);;
    }
 
    public boolean doesWineLogEntryExist(WineLogEntry wle) {
    	WineLogEntry r = mongo.getWineLogEntry(wle.getId());
    	return r != null;
    }
     
    public void deleteWineLog(){
        //mongo.removeWineLog();
    }
 
    private List<WineLogEntry> populateWineLog(){
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<WineLogEntry> wle = mongo.getWineLog(auth.getName());
        return wle;
    }

	@Override
	public void deleteAllLogEntries() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean doesLogEntryExist(WineLogEntry entry) {
		// TODO Auto-generated method stub
		return false;
	}
 
}