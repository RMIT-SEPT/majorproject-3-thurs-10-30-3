package edu.rmit.app.repo;


import edu.rmit.app.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {

    Optional<Tag> findByNameIgnoreCase(String name);
}
