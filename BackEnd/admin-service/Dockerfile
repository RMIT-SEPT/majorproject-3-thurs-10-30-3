FROM java:8-jre

ADD ./target/admin-service-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/admin-service-1.0-SNAPSHOT.jar"]

EXPOSE 8081