package edu.rmit.app.service;

import edu.rmit.app.model.Business;
import edu.rmit.app.model.BusinessRegistrationRequest;
import edu.rmit.app.repo.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BusinessService {

    @Autowired
    private BusinessRepository businessRepository;

    @Transactional
    public Business saveBusiness(BusinessRegistrationRequest request){

        Business business = new Business();
        business.setAddress(request.getAddress());
        business.setDescription(request.getDescription());
        business.setName(request.getName());
        business.setOwner(request.getOwner());

        return businessRepository.save(business);
    }
}
