# 🛍️ ShopIt

A product tracking app

---

## 📦 Setup Instructions

### 1. Environment Variables

- Create `.env` files in both the **root** and the **server** directories.

### 2. Firebase & PostgreSQL Configuration

- Add your **Firebase** credentials in:  
  `root/.env`

- Add your **PostgreSQL** credentials in:  
  `server/.env`

---

## 🛠️ Database Schema (PostgreSQL)

### 🔸 Create Database
```sql
CREATE DATABASE shopit;
```

### 🔸 Enable PostGIS extension for geo queries
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### 🔸 Stores table
```sql
CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(50) NOT NULL DEFAULT 'USA',
  phone VARCHAR(20),
  email VARCHAR(100),
  website VARCHAR(255),
  opening_hours JSONB,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔸 Products table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  barcode VARCHAR(100),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔸 Inventory Table
```sql
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10, 2),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (store_id, product_id)
);
```

### 🔸 Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid VARCHAR(128) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  home_location GEOGRAPHY(POINT),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔸 Search History Table
```sql
CREATE TABLE search_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  search_term VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔸 Indexes
```sql
CREATE INDEX idx_stores_location ON stores USING GIST (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326));
CREATE INDEX idx_inventory_store_id ON inventory(store_id);
CREATE INDEX idx_inventory_product_id ON inventory(product_id);
CREATE INDEX idx_products_name ON products(name);
```
---
### 3.Run
- Run backend by using npm run dev in server folder and front end by npm run dev in root





