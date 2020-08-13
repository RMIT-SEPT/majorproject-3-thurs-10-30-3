package edu.rmit.gateway;


import edu.rmit.gateway.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.data.mongodb.config.EnableMongoAuditing;


@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
@EnableMongoAuditing
@EnableConfigurationProperties({AppProperties.class})
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

}
