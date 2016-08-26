package gisli.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface TokenRepository extends MongoRepository<Token, String> {
    Token findBySeries(String series);
    Token findByUsername(String username);
}