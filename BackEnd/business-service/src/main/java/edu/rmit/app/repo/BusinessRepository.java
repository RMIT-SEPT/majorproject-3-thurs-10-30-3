package edu.rmit.app.repo;

import edu.rmit.app.model.Business;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepository extends MongoRepository<Business, String> {
}
