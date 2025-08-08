# 📁 Project Structure Overview

## Directory Organization

### 🎯 **Core Applications**
- **`frontend/`** - React + Vite frontend application (with its own node_modules)
- **`backend/`** - Spring Boot backend application

### 📚 **Documentation**
- **`docs/`** - All project documentation
  - `DEPLOYMENT.md` - Production deployment guide
  - `DEVELOPMENT.md` - Local development setup

### 🔧 **Scripts & Tools**
- **`scripts/`** - Build and utility scripts
  - `build.sh` - Universal build script for Render deployment
  - `test-integration.js` - Integration testing script

### 🗄️ **Database**
- **`database/`** - Database related files
  - `schema.sql` - Database schema only (tables, indexes, constraints)
  - `complete-sample-data.sql` - Complete setup with schema + sample data

### 🚀 **Deployment**
- **`deployment/`** - Deployment configurations
  - `render-frontend.yaml` - Render frontend service config
  - `render-backend.yaml` - Render backend service config

### 📦 **Root Files**
- **`package.json`** - Root package with monorepo scripts
- **`node_modules/`** - Root dependencies (concurrently for dev scripts)
- **`README.md`** - Main project documentation
- **`.gitignore`** - Git ignore rules
- **`.gitattributes`** - Git attributes

## File Purpose Guide

| File/Directory | Purpose | Used By |
|----------------|---------|---------|
| `frontend/` | React application | Developers, Render |
| `backend/` | Spring Boot API | Developers, Render |
| `scripts/build.sh` | Universal build script | Render deployment |
| `docs/` | Project documentation | Developers, DevOps |
| `database/` | SQL scripts and schema | Database setup |
| `deployment/` | Cloud deployment configs | DevOps, CI/CD |
| `package.json` | Monorepo script management | npm, developers |

## Benefits of This Structure

✅ **Clear Separation** - Frontend and backend are isolated
✅ **Organized Documentation** - All docs in one place
✅ **Reusable Scripts** - Build scripts work for any deployment
✅ **Easy Navigation** - Logical grouping of related files
✅ **Scalable** - Easy to add new services or tools
✅ **CI/CD Ready** - Clear paths for automation

## Usage Examples

```bash
# Development
npm run dev                    # Start both services
npm run build                  # Build both services

# Deployment  
BUILD_TYPE=frontend ./scripts/build.sh   # Build frontend
BUILD_TYPE=backend ./scripts/build.sh    # Build backend

# Documentation
cat docs/DEPLOYMENT.md         # Read deployment guide
cat docs/DEVELOPMENT.md        # Read development guide

# Database
psql -f database/complete-sample-data.sql  # Load sample data
```

This structure provides a clean, professional, and maintainable codebase! 🎉