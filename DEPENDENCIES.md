# 📦 Dependencies Structure

## Overview

This monorepo has a two-level dependency structure:

### 🏠 **Root Level Dependencies**
**Location:** `/node_modules/` and `/package.json`

**Purpose:** Monorepo management and development tools

**Dependencies:**
- `concurrently` - Run multiple commands simultaneously (for `npm run dev`)

**Scripts:**
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both applications
- `npm run install:all` - Install all dependencies

### 🎨 **Frontend Dependencies**
**Location:** `/frontend/node_modules/` and `/frontend/package.json`

**Purpose:** React application and build tools

**Key Dependencies:**
- `react` & `react-dom` - React framework
- `vite` - Build tool and dev server
- `axios` - HTTP client for API calls
- `tailwindcss` - CSS framework
- `firebase` - Authentication
- `react-router-dom` - Routing

### ☕ **Backend Dependencies**
**Location:** `/backend/pom.xml` (Maven manages dependencies)
**Maven Wrapper:** `/backend/.mvn/wrapper/` (Maven wrapper files)

**Purpose:** Spring Boot application

**Key Dependencies:**
- `spring-boot-starter-web` - Web framework
- `spring-boot-starter-data-jpa` - Database ORM
- `postgresql` - Database driver
- `spring-boot-starter-validation` - Input validation

**Maven Wrapper Files:**
- `mvnw` & `mvnw.cmd` - Maven wrapper scripts
- `.mvn/wrapper/maven-wrapper.properties` - Maven version config
- `.mvn/wrapper/maven-wrapper.jar` - Maven wrapper JAR

## Installation Commands

```bash
# Install all dependencies
npm run install:all

# Install only frontend dependencies
npm run install:frontend

# Install only backend dependencies (Maven)
npm run install:backend

# Install root dependencies only
npm install
```

## Why This Structure?

✅ **Separation of Concerns** - Each app manages its own dependencies
✅ **Independent Deployment** - Frontend and backend can be deployed separately
✅ **Faster Installs** - Only install what you need for development
✅ **Clear Ownership** - Easy to see which dependencies belong where
✅ **Monorepo Benefits** - Shared scripts and tooling at root level

## Development Workflow

1. **First time setup:**
   ```bash
   npm run install:all
   ```

2. **Daily development:**
   ```bash
   npm run dev  # Uses root concurrently to start both apps
   ```

3. **Adding frontend dependencies:**
   ```bash
   cd frontend && npm install <package>
   ```

4. **Adding backend dependencies:**
   ```bash
   cd backend && ./mvnw dependency:tree
   # Edit pom.xml to add dependencies
   ```

This structure provides the best of both worlds - monorepo convenience with independent application management! 🎉