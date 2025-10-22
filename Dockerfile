# -------------------------------
# Stage 0: Build React frontend
# -------------------------------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# -------------------------------
# Stage 1: Build Spring Boot backend
# -------------------------------
FROM maven:3.9.5-eclipse-temurin-17-alpine AS backend-build
WORKDIR /app/backend

# Copy only pom.xml first to leverage Docker cache
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy backend source
COPY backend/src ./src

# Copy the built frontend into backend resources
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static

# Build the JAR (skip tests)
RUN mvn clean package -DskipTests

# -------------------------------
# Stage 2: Runtime image
# -------------------------------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the JAR from the backend-build stage
COPY --from=backend-build /app/backend/target/*.jar backend.jar

# Expose port
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "backend.jar"]
