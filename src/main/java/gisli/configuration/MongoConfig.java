package gisli.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
//import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
//@EnableMongoRepositories(basePackages="gisli.model")
@EnableMongoRepositories("gisli")
public class MongoConfig extends AbstractMongoConfiguration {

	@Override
	public String getDatabaseName() {
		return "mydb";
	}

	@Override
	@Bean
	public Mongo mongo() throws Exception {
		return new MongoClient("192.168.2.108");
	}

}
