package edu.rmit.gateway.controller;

import edu.rmit.common.errors.NotFoundException;
import edu.rmit.gateway.repo.UserRepository;
import edu.rmit.gateway.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//Sam is testing
//import com.jayway.restassured.RestAssured.*;
//import com.jayway.restassured.matcher.RestAssuredMatchers.*;
//import org.hamcrest.Matchers.*;
//import static io.restassured.RestAssured.*;
//import static org.hamcrest.Matchers.*;
//import org.testing.Assert;
//import org.testing.annotation.Test;
//import io.restassured.response.Response;


@WebMvcTest(AuthController.class)
public class AuthControllerLoginTests
{
//    @Autowired
//    private MockMvc mvc;
//
//    @MockBean
//    private UserService userService;
//
//    @MockBean
//    private UserRepository userRepository;
//
//    @Test
//    public void loginUserFoundSuccess() throws Exception
//    {
//        /* Imitates successful authentication */
//        when(userService.authenticate("user", "password")).thenReturn("token");
//
//        mvc.perform(post("/auth/login")
//                .contentType("application/json")
//                .content("\"username\": \"user\", \"password\": \"password\""))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void loginUserNotFoundFailure() throws Exception
//    {
//        /* Imitates unsuccessful authentication */
//        when(userService.authenticate("user", "password"))
//                .thenThrow(new NotFoundException("Username does not exist!"));
//
//        mvc.perform(post("/auth/login")
//                .contentType("application/json")
//                .content("\"username\": \"user\", \"password\": \"password\""))
//                .andExpect(status().isNotFound());
//    }

    @Test
    public void test_NumberOfCircuitsFor2017Season_ShouldBe20() {
        given().
                when().
                get("http://ergast.com/api/f1/2017/circuits.json").
                then().
                assertThat().
                body("MRData.CircuitTable.Circuits.circuitId",hasSize(20));
    }
}