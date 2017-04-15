/**
 * 
 */
package gisli.service;

import static org.junit.Assert.*;
import gisli.configuration.TilesConfiguration;
import gisli.model.User;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.*;

/**
 * @author gislileifsson
 *
 */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration
public class MongoServiceTest {
	@Autowired
	MongoService mongo;
	
	/**
	 * @throws java.lang.Exception
	 */
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	/**
	 * @throws java.lang.Exception
	 */
	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
	}

	/**
	 * @throws java.lang.Exception
	 */
	@After
	public void tearDown() throws Exception {
	}

	/**
	 * Test method for {@link gisli.service.MongoService#insert(java.lang.Object)}.
	 */
	@Test
	public final void testInsert() {
		User user = new User();
		user.setUsername("testuser");
		mongo.insert( user );
		User u = mongo.getUser("testuser");
		mongo.deleteUser(u.getUsername());
	}

	/**
	 * Test method for {@link gisli.service.MongoService#save(java.lang.Object)}.
	 */
	@Test
	public final void testSave() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#removeRecipe(java.lang.String)}.
	 */
	@Test
	public final void testRemoveRecipe() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#removeWineLogEntry(java.lang.String)}.
	 */
	@Test
	public final void testRemoveWineLogEntry() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#removeAllRecipes()}.
	 */
	@Test
	public final void testRemoveAllRecipes() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getRecipe(java.lang.String)}.
	 */
	@Test
	public final void testGetRecipe() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getWineLogEntry(java.lang.String)}.
	 */
	@Test
	public final void testGetWineLogEntry() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getRecipeByName(java.lang.String)}.
	 */
	@Test
	public final void testGetRecipeByName() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getWineLogEntryByName(java.lang.String)}.
	 */
	@Test
	public final void testGetWineLogEntryByName() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getAllRecipes(java.lang.String)}.
	 */
	@Test
	public final void testGetAllRecipes() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getWineLog(java.lang.String)}.
	 */
	@Test
	public final void testGetWineLog() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getAllRecipesAsList(java.lang.String)}.
	 */
	@Test
	public final void testGetAllRecipesAsList() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getUser(java.lang.String)}.
	 */
	@Test
	public final void testGetUser() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#deleteUser(java.lang.String)}.
	 */
	@Test
	public final void testDeleteUser() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getUsers()}.
	 */
	@Test
	public final void testGetUsers() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getList(java.lang.String)}.
	 */
	@Test
	public final void testGetList() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#getLists()}.
	 */
	@Test
	public final void testGetLists() {
		fail("Not yet implemented"); // TODO
	}

	/**
	 * Test method for {@link gisli.service.MongoService#deleteList(java.lang.String)}.
	 */
	@Test
	public final void testDeleteList() {
		fail("Not yet implemented"); // TODO
	}

}
