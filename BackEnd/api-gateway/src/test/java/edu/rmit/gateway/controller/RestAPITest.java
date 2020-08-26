package edu.rmit.gateway.controller;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import org.testing.Assert;
import org.testing.annotation.Test;
import io.restassured.response.Response;

import com.jayway.restassured.RestAssured.*;
import com.jayway.restassured.matcher.RestAssuredMatchers.*;
import org.hamcrest.Matchers.*;


public class RestAPITest {

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


