# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Maven Wrapper Issues

#### Problem: `cannot read distributionUrl property in ./.mvn/wrapper/maven-wrapper.properties`

**Solution:**
The Maven wrapper files are missing. This has been fixed in the current version, but if you encounter this:

```bash
# Recreate Maven wrapper directory
cd backend
mkdir -p .mvn/wrapper

# Download Maven wrapper files
curl -o .mvn/wrapper/maven-wrapper.jar https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar

# Make mvnw executable
chmod +x mvnw
```

#### Problem: `Permission denied: ./mvnw`

**Solution:**
```bash
cd backend
chmod +x mvnw
```

### Frontend Issues

#### Problem: `node_modules` not found

**Solution:**
```bash
# Install frontend dependencies
cd frontend
npm install

# Or use root command
npm run install:frontend
```

#### Problem: `Cannot resolve module` errors

**Solution:**
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

#### Problem: Database connection errors

**Solution:**
1. Ensure PostgreSQL is running
2. Check database credentials in `backend/src/main/resources/application.properties`
3. Create database if it doesn't exist:
   ```sql
   CREATE DATABASE shopit;
   ```

#### Problem: Port 8080 already in use

**Solution:**
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port in application.properties
server.port=8081
```

### Development Issues

#### Problem: `npm run dev` fails

**Solution:**
```bash
# Install root dependencies
npm install

# Install all dependencies
npm run install:all

# Try running services separately
npm run dev:frontend
npm run dev:backend
```

#### Problem: API calls fail with CORS errors

**Solution:**
1. Check that backend is running on port 8080
2. Verify CORS configuration in `CorsConfig.java`
3. Check frontend API base URL in `.env`

### Deployment Issues

#### Problem: Build script fails

**Solution:**
```bash
# Make build script executable
chmod +x scripts/build.sh

# Check BUILD_TYPE environment variable
BUILD_TYPE=frontend ./scripts/build.sh
BUILD_TYPE=backend ./scripts/build.sh
```

#### Problem: Frontend build fails

**Solution:**
```bash
cd frontend
npm install
npm run build
```

#### Problem: Backend build fails

**Solution:**
```bash
cd backend
chmod +x mvnw
./mvnw clean package -DskipTests
```

### Database Issues

#### Problem: No sample data

**Solution:**
```bash
# Load sample data
psql -h localhost -U postgres -d shopit -f database/complete-sample-data.sql
```

#### Problem: Tables not created

**Solution:**
1. Check `spring.jpa.hibernate.ddl-auto=update` in application.properties
2. Ensure database exists
3. Check database connection

### Environment Issues

#### Problem: Environment variables not loaded

**Solution:**
1. Check `.env` file exists in `frontend/` directory
2. Restart development server after changing `.env`
3. Verify variable names start with `VITE_`

## Getting Help

If you're still having issues:

1. **Check logs** - Look at console output for specific error messages
2. **Verify versions** - Ensure you have correct Node.js (18+) and Java (24) versions
3. **Clean install** - Try deleting `node_modules` and reinstalling
4. **Database connection** - Test database connectivity separately
5. **Port conflicts** - Check if ports 3000, 5173, or 8080 are in use

## Useful Commands

```bash
# Check versions
node --version
java --version
npm --version

# Check running processes
lsof -i :3000
lsof -i :5173
lsof -i :8080

# Database connection test
psql -h localhost -U postgres -d shopit -c "SELECT 1;"

# Clean everything and restart
rm -rf frontend/node_modules
rm -rf node_modules
npm run install:all
npm run dev
```