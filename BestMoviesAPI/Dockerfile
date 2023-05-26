# Stage 1 - Copy
FROM maven:3-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn -f /app/pom.xml package shade:shade -DskipTests

FROM openjdk:17-jdk-slim
EXPOSE 8080
COPY --from=build /app/target/SEP6_Project-0.0.1-SNAPSHOT.jar /usr/app/SEP6_Project-0.0.1-SNAPSHOT.jar
CMD java -jar /usr/app/SEP6_Project-0.0.1-SNAPSHOT.jar