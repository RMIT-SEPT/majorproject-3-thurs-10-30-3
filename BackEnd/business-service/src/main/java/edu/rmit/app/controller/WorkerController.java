package edu.rmit.app.controller;

import edu.rmit.app.model.User;
import edu.rmit.app.model.WorkerRegistrationRequest;
import edu.rmit.app.repo.UserRepository;
import edu.rmit.app.service.WorkerService;
import edu.rmit.common.errors.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class WorkerController {

    @Autowired
    WorkerService workerService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/worker/create")
    public ResponseEntity<?> createAWorker(@RequestBody WorkerRegistrationRequest request){
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isPresent()){
            throw new BadRequestException("Email address is taken!");
        }

        return ResponseEntity.ok(workerService.saveEmployee(request));
    }
}
