# 🔧 Environment Configuration Guide

## Overview

ShopIt uses environment variables for configuration in both frontend and backend. This guide covers setting up and managing these configurations.

## Environment Files Structure

```
shopit/
├── frontend/
│   ├── .env                 # Frontend environment variables
│   └── .env.example         # Frontend template
├── backend/
│   ├── .env                 # Backend environment variables
│   └── .env.example         # Backend template
└── scripts/
    └── setup-env.sh         # Environment setup script
```

## Quick Setup

```bash
# Run the setup script to create .env files
npm run setup:env

# Or manually copy from examples
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

## Frontend Environment Variables

**File:** `frontend/.env`

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Currency Configuration
VITE_CURRENCY=INR
VITE_CURRENCY_SYMBOL=₹

# Firebase Configuration (for authentication)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Frontend Variables Explained

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8080/api` | Yes |
| `VITE_CURRENCY` | Currency code | `INR` | No |
| `VITE_CURRENCY_SYMBOL` | Currency symbol | `₹` | No |
| `VITE_FIREBASE_*` | Firebase config | - | Yes (for auth) |

## Backend Environment Variables

**File:** `backend/.env`

```env
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/shopit
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Server Configuration
SERVER_PORT=8080

# JPA/Hibernate Configuration
JPA_DDL_AUTO=update
JPA_SHOW_SQL=false

# Logging Configuration
LOG_LEVEL_ROOT=INFO
LOG_LEVEL_WEB=DEBUG
```

### Backend Variables Explained

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection URL | `jdbc:postgresql://localhost:5432/shopit` | Yes |
| `DB_USERNAME` | Database username | `postgres` | Yes |
| `DB_PASSWORD` | Database password | - | Yes |
| `SERVER_PORT` | Server port | `8080` | No |
| `JPA_DDL_AUTO` | Hibernate DDL mode | `update` | No |
| `JPA_SHOW_SQL` | Show SQL queries | `false` | No |
| `LOG_LEVEL_ROOT` | Root log level | `INFO` | No |
| `LOG_LEVEL_WEB` | Web log level | `DEBUG` | No |

## Environment-Specific Configurations

### Development
```env
# Backend
DATABASE_URL=jdbc:postgresql://localhost:5432/shopit
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true
LOG_LEVEL_WEB=DEBUG

# Frontend
VITE_API_BASE_URL=http://localhost:8080/api
```

### Production
```env
# Backend
DATABASE_URL=jdbc:postgresql://prod-host:5432/shopit_prod
JPA_DDL_AUTO=validate
JPA_SHOW_SQL=false
LOG_LEVEL_WEB=INFO

# Frontend
VITE_API_BASE_URL=https://your-api.domain.com/api
```

### Testing
```env
# Backend
DATABASE_URL=jdbc:postgresql://localhost:5432/shopit_test
JPA_DDL_AUTO=create-drop
JPA_SHOW_SQL=true

# Frontend
VITE_API_BASE_URL=http://localhost:8080/api
```

## Database Configuration Options

### Local PostgreSQL
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/shopit
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### Docker PostgreSQL
```env
DATABASE_URL=jdbc:postgresql://localhost:5433/shopit
DB_USERNAME=shopit_user
DB_PASSWORD=shopit_password
```

### Cloud Database (Render, AWS RDS, etc.)
```env
DATABASE_URL=jdbc:postgresql://host:port/database
DB_USERNAME=username
DB_PASSWORD=secure_password
```

## JPA/Hibernate DDL Options

| Value | Description | Use Case |
|-------|-------------|----------|
| `create` | Create schema, destroy previous data | Initial setup |
| `create-drop` | Create schema, drop when session ends | Testing |
| `update` | Update schema, keep existing data | Development |
| `validate` | Validate schema, no changes | Production |
| `none` | No schema management | Manual control |

## Security Best Practices

### 1. Never Commit Secrets
```bash
# Add to .gitignore
frontend/.env
backend/.env
*.env.local
```

### 2. Use Strong Passwords
```env
# Bad
DB_PASSWORD=password123

# Good
DB_PASSWORD=Kx9#mP2$vL8@nQ5!
```

### 3. Environment-Specific Files
```bash
# Development
backend/.env.development

# Production
backend/.env.production

# Testing
backend/.env.test
```

### 4. Validate Required Variables
The application will fail to start if required variables are missing.

## Troubleshooting

### Environment Variables Not Loading

**Frontend:**
```bash
# Check if variables start with VITE_
echo $VITE_API_BASE_URL

# Restart dev server after changes
npm run dev
```

**Backend:**
```bash
# Check if .env file exists
ls -la backend/.env

# Check if dotenv dependency is installed
cd backend && ./mvnw dependency:tree | grep dotenv
```

### Database Connection Issues

```bash
# Test database connection
psql -h localhost -U postgres -d shopit -c "SELECT 1;"

# Check environment variables
echo $DATABASE_URL
echo $DB_USERNAME
```

### Port Conflicts

```bash
# Check if port is in use
lsof -i :8080
lsof -i :5173

# Change ports in .env
SERVER_PORT=8081
```

## Deployment Considerations

### Render
Set environment variables in Render dashboard:
- Go to your service settings
- Add environment variables
- Redeploy service

### Docker
```dockerfile
# Use environment variables in Dockerfile
ENV DATABASE_URL=${DATABASE_URL}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
```

### CI/CD
```yaml
# GitHub Actions example
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  DB_USERNAME: ${{ secrets.DB_USERNAME }}
  DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
```

## Useful Commands

```bash
# Setup environment files
npm run setup:env

# Check environment status
./scripts/setup-env.sh

# Test database connection
psql $DATABASE_URL -c "SELECT 1;"

# View current environment (be careful with secrets!)
printenv | grep -E "(DATABASE|VITE_|SERVER_)"
```

This configuration system provides flexibility for different environments while maintaining security and ease of use! 🚀