package edu.rmit.gateway.controller;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;

class RestAPITestTest {
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