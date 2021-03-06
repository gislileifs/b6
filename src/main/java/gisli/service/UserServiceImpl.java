package gisli.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gisli.model.User;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	MongoService mongo;
	
	public void saveUser(User user) {
		mongo.save(user);
		System.out.println("After mongo.save. User actually saved. " + user.toString());
	}

	public User getUser(String id) {
		return mongo.getUser(id);
	}

	public List<User> getAllUsers() {
		return mongo.getUsers();		
	}

	public void deleteUser(String id) {
		// TODO Auto-generated method stub
		mongo.deleteUser(id);		
	}

}
