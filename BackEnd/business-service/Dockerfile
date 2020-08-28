FROM java:8-jre

ADD ./target/business-service-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/business-service-1.0-SNAPSHOT.jar"]

EXPOSE 8082