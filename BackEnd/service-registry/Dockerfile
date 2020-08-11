FROM java:8-jre

ADD ./target/service-registry-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/service-registry-1.0-SNAPSHOT.jar"]

EXPOSE 8761