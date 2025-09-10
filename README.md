# ShopIt - Product Store Locator

A full-stack application with **dual interfaces**: customers can find products in nearby stores, and store owners can manage their inventory and business operations.

## 🎯 **Dual Interface Architecture**

ShopIt features two completely separate user interfaces:

### 🛒 **Customer Interface** (`/customer/*`)
- Product search across multiple stores
- Store locator with geolocation
- Interactive maps and directions
- Search history tracking
- User profiles and preferences

### 🏪 **Store Owner Interface** (`/store-owner/*`)
- Store registration and management
- Inventory management system
- Product date tracking (manufacturing/expiry)
- Business analytics and reporting
- Multi-store support for chains

## 🏗️ Project Structure

```
shopit/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── components/      # Shared and interface-specific components
│   │   │   ├── CustomerApp.jsx      # Customer interface wrapper
│   │   │   ├── StoreOwnerApp.jsx    # Store owner interface wrapper
│   │   │   ├── CustomerNavbar.jsx   # Customer navigation
│   │   │   └── StoreOwnerNavbar.jsx # Store owner navigation
│   │   ├── pages/           # Page components for both interfaces
│   │   ├── contexts/        # Authentication and state management
│   │   └── services/        # API communication
├── backend/                  # Spring Boot backend application
│   ├── src/main/java/       # Java source code
│   │   ├── controller/      # REST API endpoints
│   │   ├── service/         # Business logic
│   │   ├── entity/          # Database entities
│   │   ├── repository/      # Data access layer
│   │   └── dto/             # Data transfer objects
│   ├── src/main/resources/  # Application properties
│   ├── pom.xml             # Maven dependencies
│   └── mvnw                # Maven wrapper
├── database/                # Database related files
│   ├── schema.sql           # Database schema only
│   └── complete-sample-data.sql  # Schema + sample data + test accounts
├── docs/                    # Documentation
├── scripts/                 # Build and utility scripts
├── deployment/              # Deployment configurations
└── package.json            # Root package.json with scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Java 24
- PostgreSQL with PostGIS extension
- Maven (or use included wrapper)

### Development Setup

1. **Setup environment variables:**
   ```bash
   npm run setup:env
   ```

2. **Install dependencies:**
   ```bash
   npm run install:all
   ```

3. **Setup database:**
   ```bash
   createdb shopit
   psql -d shopit -f database/complete-sample-data.sql
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - **Landing Page:** http://localhost:5173
   - **Customer Interface:** http://localhost:5173/customer
   - **Store Owner Interface:** http://localhost:5173/store-owner
   - **Backend API:** http://localhost:8080/api

## 📦 Building for Production

```bash
# Build both services
npm run build

# Build individually
npm run build:frontend
npm run build:backend
```

## 📚 Documentation

- [Development Setup](docs/DEVELOPMENT.md) - Local development guide
- [Environment Configuration](docs/ENVIRONMENT_CONFIG.md) - Environment variables setup
- [Database Setup](docs/DATABASE_SETUP.md) - Database schema and sample data
- [Store Owner Management](docs/STORE_OWNER_FEATURE.md) - Store registration and inventory management
- [Product Expiry Feature](docs/PRODUCT_EXPIRY_FEATURE.md) - Manufacturing and expiry date tracking
- [Search History Feature](docs/SEARCH_HISTORY_FEATURE.md) - User search tracking
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment

## 🛠️ Available Scripts

| Command                    | Description                        |
| -------------------------- | ---------------------------------- |
| `npm run setup:env`        | Setup environment variables        |
| `npm run dev`              | Start both frontend and backend    |
| `npm run build`            | Build both services for production |
| `npm run install:all`      | Install all dependencies           |
| `npm run test:integration` | Run integration tests              |
| `npm run deploy:frontend`  | Deploy frontend to Render          |
| `npm run deploy:backend`   | Deploy backend to Render           |

## 📱 Features

### 🛒 **Customer Features**
- 🔍 **Product Search** - Find products across multiple stores
- 📍 **Store Locator** - GPS-based nearby store discovery
- 🗺️ **Interactive Maps** - Visual store locations with directions
- 📅 **Expiry Tracking** - Product freshness indicators
- 🔍 **Search History** - Personal search tracking and quick re-search
- 📱 **Mobile Responsive** - Optimized for all devices
- 🔐 **Firebase Auth** - Secure customer authentication

### 🏪 **Store Owner Features**
- 🏪 **Store Management** - Register and manage store information
- 📦 **Inventory Control** - Real-time stock management
- 📅 **Date Tracking** - Manufacturing and expiry date monitoring
- 👥 **Multi-Store Support** - Manage multiple store locations
- 🔐 **Secure Authentication** - Dedicated store owner login system
- 📊 **Business Analytics** - Store performance insights
- 🎯 **Role Management** - Owner/Manager/Staff permissions

### 🌐 **Technical Features**
- 💰 **Multi-Currency** - INR support with extensible framework
- 🗄️ **PostgreSQL + PostGIS** - Geospatial database capabilities
- 🚀 **RESTful APIs** - Clean, documented backend services
- 🎨 **Modern UI** - Tailwind CSS with component-based architecture

## 🚧 Current Implementation Status

### ✅ **Completed Features**
- **Dual Interface Architecture** - Separate customer and store owner UIs
- **Store Owner Authentication** - Complete login/registration system
- **Database Schema** - Full PostgreSQL setup with PostGIS
- **Sample Data** - 5 stores, 14+ products, inventory data
- **UI Components** - Modern, responsive design with Tailwind CSS
- **Navigation** - Role-based routing and navigation systems

### 🔄 **In Development**
- **Product Search API** - Backend search functionality
- **Geolocation Services** - Store proximity calculations
- **Firebase Integration** - Customer authentication setup
- **Inventory Management** - CRUD operations for products
- **Maps Integration** - Interactive store location maps

### 📋 **Planned Features**
- **Real-time Updates** - Live inventory synchronization
- **Analytics Dashboard** - Business intelligence for store owners
- **Mobile App** - React Native implementation
- **Payment Integration** - Order processing system

## 🔑 Test Accounts

### Store Owner Login Credentials
Use these accounts to test the store owner interface:

| Email | Password | Name | Business |
|-------|----------|------|----------|
| `owner@bigbazaar.com` | `password123` | Rajesh Kumar | Big Bazaar Phoenix |
| `manager@reliancefresh.com` | `password123` | Priya Sharma | Reliance Fresh FC Road |
| `owner@spencers.in` | `password123` | Amit Patel | Spencer's HITEC City |
| `admin@moreretail.in` | `password123` | Sunita Singh | More Megastore CP |
| `owner@dmart.in` | `password123` | Vikram Reddy | DMart Whitefield |

### Customer Authentication
- Customer accounts use Firebase authentication
- Register new accounts or use existing Firebase credentials
- No pre-configured test accounts needed

## 🚀 Getting Started

### 1. Choose Your Interface
Visit http://localhost:5173 and select:
- **"I'm a Customer"** - Product search and store discovery
- **"I'm a Store Owner"** - Business management and inventory

### 2. Customer Workflow
1. Register/Login with Firebase
2. Allow location access for nearby stores
3. Search for products (try "Aashirvaad", "Samsung", "Amul")
4. View store details and get directions
5. Check search history in your profile

### 3. Store Owner Workflow
1. Login with test credentials above
2. View your store dashboard
3. Register additional stores
4. Manage inventory and product information
5. Track business analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
