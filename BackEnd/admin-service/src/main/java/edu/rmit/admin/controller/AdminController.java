package edu.rmit.admin.controller;

import edu.rmit.admin.model.RegistrationRequest;
import edu.rmit.admin.model.User;
import edu.rmit.admin.repo.UserRepository;
import edu.rmit.admin.service.AdminService;
import edu.rmit.common.errors.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@CrossOrigin("*")
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> registerABusinessOwner(RegistrationRequest registrationRequest){
        Optional<User> optionalUser = userRepository.findByEmail(registrationRequest.getEmail());

        if (optionalUser.isPresent()){
            throw new BadRequestException("Email address is taken!");
        }

        return ResponseEntity.ok(adminService.saveOwner(registrationRequest));
    }
}
