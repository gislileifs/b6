package gisli.model;

public class UserRole {
	private Integer userRoleId;
	//private User user;
	private String role;
	
	public UserRole( Integer id, String role ) {
		userRoleId = id;
		this.role = role;
	}
	
	public Integer getUserRoleId() {
		return userRoleId;
	}
	public void setUserRoleId(Integer userRoleId) {
		this.userRoleId = userRoleId;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
