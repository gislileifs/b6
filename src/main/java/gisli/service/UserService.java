package gisli.service;

import java.util.List;

import gisli.model.User;

public interface UserService {

	public void saveUser( User user );
	
	public void deleteUser(String id);
	
	public User getUser(String id );
	
	public List<User> getAllUsers();
}
