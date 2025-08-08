#!/bin/bash

# Build script for Render deployment
echo "🚀 Starting ShopIt deployment build..."

# Determine which service to build based on environment variable
if [ "$BUILD_TYPE" = "frontend" ]; then
    echo "📦 Building Frontend..."
    cd frontend
    npm install
    npm run build
    echo "✅ Frontend build complete!"
    
elif [ "$BUILD_TYPE" = "backend" ]; then
    echo "📦 Building Backend..."
    cd backend
    chmod +x mvnw
    ./mvnw clean package -DskipTests
    echo "✅ Backend build complete!"
    
else
    echo "❌ BUILD_TYPE environment variable not set!"
    echo "Set BUILD_TYPE to 'frontend' or 'backend'"
    exit 1
fi