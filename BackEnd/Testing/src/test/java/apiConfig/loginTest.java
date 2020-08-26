package apiConfig;

import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;
import static io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.Matchers.*;

public class loginTest {

    public static void main(String[] args){
        testRegistrationWithInvalidCredential();
    }

    @Test
    public static void testRegistrationWithInvalidCredential() {
        String myURL="http://localhost:8080/auth/registration";

        User u1 = new User("awefawrg","awefawerg");
        given().contentType("application/json")
                .with().body(u1)
                .when()
                .request("POST", myURL)
                .then()
                .body("error",equalTo("Not Found"));
    }

    @Test
    public static void testGetMethod() {
            given().
                get("https://reqres.in/api/users?page=2")
                .then()
                .statusCode(200)
                .body("data.id[0]",equalTo(8));
    }

        public static class User {
        private String username;
        private String password;

        public User(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}