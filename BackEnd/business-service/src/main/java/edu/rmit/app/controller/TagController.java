package edu.rmit.app.controller;


import edu.rmit.app.model.*;
import edu.rmit.app.repo.BusinessRepository;
import edu.rmit.app.repo.TagRepository;
import edu.rmit.app.repo.UserRepository;
import edu.rmit.app.service.TagService;
import edu.rmit.common.errors.BadRequestException;
import edu.rmit.common.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class TagController {

    @Autowired
    TagService tagService;

    @Autowired
    BusinessRepository businessRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    @PostMapping("/tag/create")
    public ResponseEntity<?> createABusiness(@RequestBody TagRequest tagRequest){
        Optional<Business> optionalBusiness = businessRepository.findById(tagRequest.getBusinessId());

        if (!optionalBusiness.isPresent()){
            throw new NotFoundException("Business does not exist");
        }

        Optional<User> optionalUser = userRepository.findById(tagRequest.getUserId());

        if (!optionalUser.isPresent()){
            throw new NotFoundException("User does not exist");
        }

        if (!optionalUser.get().getBusiness().getId().equals(optionalBusiness.get().getId())){
            throw new NotFoundException("This user is not authorized to commit such as action");
        }

        Optional<Tag> optionalTag = tagRepository.findByNameIgnoreCase(tagRequest.getName());

        if (optionalTag.isPresent()){
            throw new BadRequestException("This tag already exists!");
        }

        return ResponseEntity.ok(tagService.saveTag(tagRequest, optionalBusiness.get()));
    }
}
