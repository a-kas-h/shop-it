# Stage 1: Build React frontend
#FROM node:20-alpine AS frontend-builder
#WORKDIR /app/frontend

# Copy package.json and install dependencies
#COPY frontend/package*.json ./
#RUN npm install

# Copy source code and build
#COPY frontend/ ./
#RUN npm run build

# Stage 2: Build Spring Boot backend (with frontend included)
FROM maven:3.9.5-amazoncorretto-17-debian AS backend-builder
WORKDIR /app

# Copy pom.xml and download dependencies
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy backend source
COPY backend/src ./src

# Copy React build into backend resources BEFORE packaging
#COPY --from=frontend-builder /app/frontend/dist/ ./src/main/resources/static/

# Build backend JAR (now includes frontend)
RUN mvn clean package -DskipTests

# Stage 3: Create final image
FROM amazoncorretto:17-alpine
WORKDIR /app

# Copy the built JAR
COPY --from=backend-builder /app/target/*.jar backend.jar

# Expose port and run
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "backend.jar"]
