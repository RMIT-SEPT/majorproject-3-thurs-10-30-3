package edu.rmit.gateway;

import edu.rmit.gateway.controller.AuthController;
import edu.rmit.gateway.model.RegistrationRequest;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;


import java.net.URI;

@RunWith(SpringRunner.class)
@WebMvcTest(value = AuthController.class)
public class AuthControllerTest {

    @Autowired
    TestRestTemplate restTemplate;

    @Test
    public void testUserRegistration() throws Exception {

        final String url = "http://localhost:8080/auth/register";
        URI uri = new URI(url);

        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("haha@gmail.com");
        request.setAddress("87 Franklin St.");
        request.setName("Alex");
        request.setPassword("password");
        request.setUsername("username");
        request.setPhone("0123456789");

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-COM-PERSIST", "true");

        HttpEntity<RegistrationRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<String> result = this.restTemplate.postForEntity(uri, entity, String.class);

        Assert.assertEquals(200, result.getStatusCodeValue());
    }

}
