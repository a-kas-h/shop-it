# -------------------------------
# Stage 1: Build Spring Boot backend
# -------------------------------
FROM maven:3.9.5-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy only pom.xml first to download dependencies (leverages Docker cache)
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy backend source
COPY backend/src ./src

# Build the JAR (skip tests for faster builds and lower memory usage)
RUN mvn clean package -DskipTests

# -------------------------------
# Stage 2: Runtime image
# -------------------------------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar backend.jar

# Expose port
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "backend.jar"]
