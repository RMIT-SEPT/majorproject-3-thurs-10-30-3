FROM java:8-jre

ADD ./target/config-service-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/config-service-1.0-SNAPSHOT.jar"]

EXPOSE 8888