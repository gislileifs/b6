package gisli.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gisli.MyMongo;
import gisli.model.User;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	MyMongo mongo = new MyMongo(); 
	
	@Override
	public void saveUser(User user) {
		mongo.save(user);
		System.out.println("After mongo.save. User actually saved. " + user.toString());
	}

	@Override
	public User getUser(String id) {
		return mongo.getUser(id);
	}

	@Override
	public List<User> getAllUsers() {
		System.out.println("UserService.getAllUsers");
		System.out.println("UserServiceImpl: getAllUsers");
		return mongo.getUsers();		
	}

	@Override
	public void deleteUser(String id) {
		// TODO Auto-generated method stub
		mongo.deleteUser(id);		
	}

}
