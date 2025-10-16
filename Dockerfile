# ===============================
# Stage 1: Build React frontend
# ===============================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy frontend package files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy frontend source code and build
COPY frontend/ ./
RUN npm run build

# ===============================
# Stage 2: Build Spring Boot backend
# ===============================
FROM maven:3.9.5-openjdk-17 AS backend-builder
WORKDIR /app

# Copy backend source code
COPY backend/ ./

# Build Spring Boot app (skip tests for speed)
RUN mvn clean package -DskipTests

# ===============================
# Stage 3: Create final runtime image
# ===============================
FROM openjdk:17-jre-slim
EXPOSE 8080

# Set up non-root user
ENV APPLICATION_USER=springapp
ENV HOME=/home/$APPLICATION_USER
RUN groupadd $APPLICATION_USER && useradd -s /bin/false -g $APPLICATION_USER -m $APPLICATION_USER

# Set working directory
RUN mkdir /app
WORKDIR /app

# Copy backend JAR
COPY --from=backend-builder /app/target/*.jar app.jar

# Copy frontend build into Spring Boot static folder
RUN mkdir -p /app/BOOT-INF/classes/static/
COPY --from=frontend-builder /app/build /app/BOOT-INF/classes/static/

# Run as non-root user
USER $APPLICATION_USER

# Start Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
