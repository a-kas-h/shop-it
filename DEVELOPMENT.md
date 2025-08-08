# Development Setup Guide

This project consists of a React frontend and a Spring Boot backend.

## Prerequisites

- Node.js (v18 or higher)
- Java 24 (as specified in pom.xml)
- Maven (or use the included Maven wrapper)
- PostgreSQL database

## Database Setup

1. Create a PostgreSQL database named `shopit`
2. Update the database credentials in `shopit/src/main/resources/application.properties`
3. The application will automatically create tables on startup

## Running the Application

### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev:full
```

### Option 2: Run Separately

#### Backend (Spring Boot)
```bash
cd shopit
./mvnw spring-boot:run
```
The backend will run on http://localhost:8080

#### Frontend (React + Vite)
```bash
npm run dev
```
The frontend will run on http://localhost:5173

## API Endpoints

The Spring Boot backend provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/search?query=<product>&lat=<latitude>&lng=<longitude>&radius=<km>` - Search for products in nearby stores
- `GET /api/stores/{storeId}` - Get store details and inventory

## Environment Variables

Copy `.env.example` to `.env` and update the values:

- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:8080/api)
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key (if using maps)
- Firebase config (if using Firebase authentication)

## Development Notes

- The frontend uses Vite proxy to forward `/api` requests to the Spring Boot backend
- CORS is configured in the Spring Boot application to allow frontend requests
- The database schema is automatically managed by Hibernate