package edu.rmit.app.controller;

import edu.rmit.app.model.BusinessRegistrationRequest;
import edu.rmit.app.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class BusinessController {

    @Autowired
    BusinessService businessService;

    @PostMapping("/create")
    public ResponseEntity<?> createABusiness(@RequestBody BusinessRegistrationRequest request){

        return ResponseEntity.ok(businessService.saveBusiness(request));
    }
}
