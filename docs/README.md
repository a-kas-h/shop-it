# ShopIt - Product Store Locator

A full-stack application to find products in nearby stores using React frontend and Spring Boot backend.

## 🏗️ Project Structure

```
shopit/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── backend/                  # Spring Boot backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── mvnw
├── build.sh                  # Deployment build script
├── render-frontend.yaml      # Render frontend config
├── render-backend.yaml       # Render backend config
└── package.json             # Root package.json
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
   This starts both frontend (port 5173) and backend (port 8080)

3. **Or run separately:**
   ```bash
   # Frontend only
   npm run dev:frontend
   
   # Backend only  
   npm run dev:backend
   ```

## 📦 Building for Production

### Build both services:
```bash
npm run build
```

### Build individually:
```bash
# Frontend only
npm run build:frontend

# Backend only
npm run build:backend
```

## 🌐 Deployment on Render

### Option 1: Single Repository (Recommended)

1. **Deploy Frontend:**
   - Service Type: Static Site
   - Build Command: `BUILD_TYPE=frontend ./build.sh`
   - Publish Directory: `frontend/dist`

2. **Deploy Backend:**
   - Service Type: Web Service
   - Build Command: `BUILD_TYPE=backend ./build.sh`
   - Start Command: `cd backend && java -jar target/shopit-0.0.1-SNAPSHOT.jar`

### Option 2: Using Render YAML

Deploy using the provided YAML files:
- `render-frontend.yaml` for frontend
- `render-backend.yaml` for backend

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_CURRENCY=INR
VITE_CURRENCY_SYMBOL=₹
VITE_FIREBASE_API_KEY=your_key
```

### Backend (application.properties)
```
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/shopit
spring.datasource.username=postgres
spring.datasource.password=your_password
```

## 🗄️ Database Setup

1. Create PostgreSQL database named `shopit`
2. Run the sample data script: `complete-sample-data.sql`
3. The application will auto-create tables on startup

## 🔍 API Endpoints

- `GET /api/health` - Health check
- `GET /api/search` - Search products in nearby stores
- `GET /api/stores/{id}` - Get store details

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run build` | Build both services |
| `npm run install:all` | Install all dependencies |
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