package gisli.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import gisli.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import gisli.service.MongoService;

@Service
public class SecUserDetailsService implements UserDetailsService{

	@Autowired 
	MongoService mongo;

    //@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /*Here add user data layer fetching from the MongoDB.
          I have used userRepository*/
    	Set<UserRole> role = new HashSet<UserRole>();
    	role.add( new UserRole( 0, "ROLE_ADMIN") );
        
    	//User user = new User( "gisli", "gisli.123", true, role );
    	User user = mongo.getUser(username);
    	//System.out.println("In SecUserDetails. user: " + theuser.toString() );
        //User user = new User( username, username + ".123", true, role );
    	user.setEnabled(true);
    	user.setUserRole(role);
        
        if(user == null){
            throw new UsernameNotFoundException(username);
        }else{
            //UserDetails details = new SecUserDetails(user);
            
            List<GrantedAuthority> authorities = 
                    buildUserAuthority(user.getUserRole());

            return buildUserForAuthentication(user, authorities);
            
            //return details;
        }
    }
    
	// Converts com.mkyong.users.model.User user to
	// org.springframework.security.core.userdetails.User
	private org.springframework.security.core.userdetails.User buildUserForAuthentication(User user, 
		List<GrantedAuthority> authorities) {
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), 
			user.isEnabled(), true, true, true, authorities);
	}

	private List<GrantedAuthority> buildUserAuthority(Set<UserRole> userRoles) {

		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();

		// Build user's authorities
		for (UserRole userRole : userRoles) {
			setAuths.add(new SimpleGrantedAuthority(userRole.getRole()));
		}

		List<GrantedAuthority> Result = new ArrayList<GrantedAuthority>(setAuths);

		return Result;
	}
}