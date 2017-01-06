package gisli.service;

import java.util.List;
 
import gisli.model.WineLogEntry;
 
public interface WineService {
     
    WineLogEntry findById(String id);
     
    WineLogEntry findByName(String name);
     
    void saveLogEntry(WineLogEntry entry);
     
    void updateLogEntry(WineLogEntry entry);
     
    void deleteLogEntryById(String id);
 
    List<WineLogEntry> findAllLogEntries(String username); 
     
    void deleteAllLogEntries();
     
    public boolean doesLogEntryExist(WineLogEntry entry);
     
}