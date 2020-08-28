package edu.rmit.app.service;

import edu.rmit.app.model.Business;
import edu.rmit.app.model.Tag;
import edu.rmit.app.model.TagRequest;
import edu.rmit.app.repo.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    @Transactional
    public Tag saveTag(TagRequest request, Business business){
        Tag tag = new Tag();
        tag.setName(request.getName());
        tag.setBusiness(business);

        return tagRepository.save(tag);
    }

}
