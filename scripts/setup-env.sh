#!/bin/bash

# Environment Setup Script for ShopIt
# This script helps set up environment variables for both frontend and backend

echo "🔧 ShopIt Environment Setup"
echo "=========================="

# Check if .env files exist
FRONTEND_ENV="frontend/.env"
BACKEND_ENV="backend/.env"

echo ""
echo "📁 Checking environment files..."

# Frontend .env check
if [ -f "$FRONTEND_ENV" ]; then
    echo "✅ Frontend .env exists: $FRONTEND_ENV"
else
    echo "❌ Frontend .env missing: $FRONTEND_ENV"
    echo "   Creating from template..."
    cp frontend/.env.example "$FRONTEND_ENV" 2>/dev/null || echo "   ⚠️  No .env.example found in frontend/"
fi

# Backend .env check
if [ -f "$BACKEND_ENV" ]; then
    echo "✅ Backend .env exists: $BACKEND_ENV"
else
    echo "❌ Backend .env missing: $BACKEND_ENV"
    echo "   Creating from template..."
    cp backend/.env.example "$BACKEND_ENV" 2>/dev/null || echo "   ⚠️  No .env.example found in backend/"
fi

echo ""
echo "🗄️ Database Configuration Check"
echo "==============================="

# Check if PostgreSQL is running
if command -v psql >/dev/null 2>&1; then
    echo "✅ PostgreSQL client found"
    
    # Test database connection
    if psql -h localhost -U postgres -d shopit -c "SELECT 1;" >/dev/null 2>&1; then
        echo "✅ Database 'shopit' is accessible"
    else
        echo "❌ Cannot connect to database 'shopit'"
        echo "   Make sure PostgreSQL is running and database exists:"
        echo "   createdb shopit"
    fi
else
    echo "❌ PostgreSQL client (psql) not found"
    echo "   Install PostgreSQL to continue"
fi

echo ""
echo "🔑 Environment Variables Summary"
echo "==============================="

echo ""
echo "Frontend (.env):"
if [ -f "$FRONTEND_ENV" ]; then
    echo "   VITE_API_BASE_URL=$(grep VITE_API_BASE_URL $FRONTEND_ENV | cut -d'=' -f2)"
    echo "   VITE_CURRENCY=$(grep VITE_CURRENCY $FRONTEND_ENV | cut -d'=' -f2)"
else
    echo "   ❌ No frontend .env file"
fi

echo ""
echo "Backend (.env):"
if [ -f "$BACKEND_ENV" ]; then
    echo "   DATABASE_URL=$(grep DATABASE_URL $BACKEND_ENV | cut -d'=' -f2)"
    echo "   DB_USERNAME=$(grep DB_USERNAME $BACKEND_ENV | cut -d'=' -f2)"
    echo "   SERVER_PORT=$(grep SERVER_PORT $BACKEND_ENV | cut -d'=' -f2)"
else
    echo "   ❌ No backend .env file"
fi

echo ""
echo "🚀 Next Steps"
echo "============"
echo "1. Update database credentials in backend/.env if needed"
echo "2. Update API URL in frontend/.env if needed"
echo "3. Run: npm run install:all"
echo "4. Run: npm run dev"
echo ""
echo "For database setup, run:"
echo "   psql -d shopit -f database/complete-sample-data.sql"
echo ""