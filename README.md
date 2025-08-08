# ShopIt - Product Store Locator

A full-stack application to find products in nearby stores using React frontend and Spring Boot backend.

## 🏗️ Project Structure

```
shopit/
├── frontend/                 # React + Vite frontend application
│   ├── src/                 # React source code
│   ├── public/              # Static assets
│   ├── node_modules/        # Frontend dependencies
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                  # Spring Boot backend application
│   ├── src/main/java/       # Java source code
│   ├── src/main/resources/  # Application properties
│   ├── pom.xml             # Maven dependencies
│   └── mvnw                # Maven wrapper
├── docs/                    # Documentation
│   ├── DEPLOYMENT.md        # Deployment guide
│   └── DEVELOPMENT.md       # Development setup
├── scripts/                 # Build and utility scripts
│   ├── build.sh            # Deployment build script
│   └── test-integration.js  # Integration tests
├── database/                # Database related files
│   └── complete-sample-data.sql  # Sample data
├── deployment/              # Deployment configurations
│   ├── render-frontend.yaml # Render frontend config
│   └── render-backend.yaml  # Render backend config
├── node_modules/            # Root dependencies (concurrently)
└── package.json            # Root package.json with scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 24
- PostgreSQL
- Maven (or use included wrapper)

### Development Setup

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api

## 📦 Building for Production

```bash
# Build both services
npm run build

# Build individually
npm run build:frontend
npm run build:backend
```

## 🌐 Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Commands for Render:

**Frontend (Static Site):**
```bash
BUILD_TYPE=frontend ./scripts/build.sh
```

**Backend (Web Service):**
```bash
BUILD_TYPE=backend ./scripts/build.sh
```

## 📚 Documentation

- [Development Setup](docs/DEVELOPMENT.md) - Local development guide
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment
- [Database Setup](database/) - Sample data and schema

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run build` | Build both services for production |
| `npm run install:all` | Install all dependencies |
| `npm run test:integration` | Run integration tests |
| `npm run deploy:frontend` | Deploy frontend to Render |
| `npm run deploy:backend` | Deploy backend to Render |

## 📱 Features

- 🔍 Search products by name
- 📍 Find nearby stores using geolocation  
- 🗺️ Interactive maps with store locations
- 📱 Responsive design for mobile and desktop
- 💰 Multi-currency support (INR by default)
- 🔐 Firebase authentication
- 📊 Store inventory management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details