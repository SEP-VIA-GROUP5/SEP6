FROM maven:3-openjdk-17 AS build
COPY BestMoviesAPI /usr/src/app/BestMoviesAPI
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml package shade:shade

FROM openjdk:17-jdk-slim
COPY --from=build /usr/src/app/target/SEP6_Project-0.0.1-SNAPSHOT.jar /usr/app/SEP6_Project-0.0.1-SNAPSHOT.jar
COPY my-project-1521814632192-74db441a7e07.json /usr/src/app/my-project-1521814632192-74db441a7e07.json
CMD java -jar /usr/app/SEP6_Project-0.0.1-SNAPSHOT.jar