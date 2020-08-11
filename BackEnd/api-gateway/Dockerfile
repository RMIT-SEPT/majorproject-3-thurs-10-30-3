FROM java:8-jre

ADD ./target/api-gateway-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/api-gateway-1.0-SNAPSHOT.jar"]

EXPOSE 8080