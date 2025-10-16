# Stage 1: Build Spring Boot backend
# ===============================
FROM maven:3.9.5-amazoncorretto-17-debian AS backend-builder
WORKDIR /app

# Copy pom.xml and download dependencies
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Build React frontend
# ==============================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source code and build
COPY frontend/ ./
RUN npm run build

# Stage 3: Create final image
# ============================
FROM maven:3.9.5-amazoncorretto-17-debian
WORKDIR /app

# Copy backend JAR and frontend build
COPY --from=backend-builder /app/target/*.jar backend.jar
# Copy React build into Spring Boot static resources
RUN mkdir -p /app/BOOT-INF/classes/static/
COPY --from=frontend-builder /app/dist/ /app/BOOT-INF/classes/static/

# Expose port and run application
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend.jar"]
