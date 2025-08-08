# 🚀 Deployment Guide for Render

## Single Repository Deployment Commands

### Frontend Deployment
**Service Type:** Static Site
```bash
# Build Command
BUILD_TYPE=frontend ./build.sh

# Publish Directory
frontend/dist

# Environment Variables
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
VITE_CURRENCY=INR
VITE_CURRENCY_SYMBOL=₹
```

### Backend Deployment
**Service Type:** Web Service
```bash
# Build Command
BUILD_TYPE=backend ./build.sh

# Start Command
cd backend && java -jar target/shopit-0.0.1-SNAPSHOT.jar

# Environment Variables
DATABASE_URL=postgresql://username:password@host:port/database
SPRING_PROFILES_ACTIVE=production
```

## Alternative Commands (if build.sh doesn't work)

### Frontend
```bash
# Build Command
cd frontend && npm install && npm run build

# Publish Directory
frontend/dist
```

### Backend
```bash
# Build Command
cd backend && chmod +x mvnw && ./mvnw clean package -DskipTests

# Start Command
cd backend && java -jar target/shopit-0.0.1-SNAPSHOT.jar
```

## Database Setup on Render

1. Create PostgreSQL database service
2. Note the connection details
3. Add DATABASE_URL to backend environment variables
4. Run the sample data script after first deployment

## Post-Deployment Steps

1. Update frontend VITE_API_BASE_URL with backend URL
2. Test the health endpoint: `https://your-backend.onrender.com/api/health`
3. Verify frontend can connect to backend
4. Add sample data to database

## Troubleshooting

- **Build fails:** Check Java version (should be 24)
- **Frontend can't connect:** Verify CORS and API URL
- **Database errors:** Check connection string format
- **404 errors:** Ensure SPA routing is configured