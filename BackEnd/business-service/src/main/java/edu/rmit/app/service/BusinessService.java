package edu.rmit.app.service;

import edu.rmit.app.model.Business;
import edu.rmit.app.model.BusinessRegistrationRequest;
import edu.rmit.app.model.User;
import edu.rmit.app.repo.BusinessRepository;
import edu.rmit.app.repo.UserRepository;
import edu.rmit.common.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BusinessService {

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Business saveBusiness(BusinessRegistrationRequest request){

        Optional<User> optional = userRepository.findById(request.getOwner());

        if (!optional.isPresent()){
            throw new NotFoundException("Owner Not Found");
        }



        Business business = new Business();
        business.setAddress(request.getAddress());
        business.setDescription(request.getDescription());
        business.setName(request.getName());

        Business newBusiness = businessRepository.save(business);
        User user = optional.get();
        user.setBusiness(newBusiness);
        userRepository.save(user);

        return newBusiness;
    }
}
