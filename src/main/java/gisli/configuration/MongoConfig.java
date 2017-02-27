package gisli.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
//import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
//@EnableMongoRepositories(basePackages="gisli.model")
@EnableMongoRepositories("gisli")
@PropertySource("classpath:mongo.properties")
public class MongoConfig extends AbstractMongoConfiguration {

	@Autowired
	Environment env;
	
	@Override
	public String getDatabaseName() {
		return env.getProperty("mongo.db.name");
	}

	@Override
	@Bean
	public Mongo mongo() throws Exception {
		String host = env.getProperty("mongo.host");
		return new MongoClient(host);	}

}
