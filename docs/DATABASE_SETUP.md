# 🗄️ Database Setup Guide

## Overview

ShopIt uses PostgreSQL with PostGIS extension for geospatial queries. This guide covers database setup, schema creation, and data population.

## Prerequisites

- PostgreSQL 12+ installed and running
- PostGIS extension available
- Database user with CREATE privileges

## Quick Setup

### Option 1: Complete Setup (Recommended)
```bash
# Create database
createdb shopit

# Run complete setup with sample data
psql -d shopit -f database/complete-sample-data.sql
```

### Option 2: Schema Only
```bash
# Create database
createdb shopit

# Create schema only
psql -d shopit -f database/schema.sql

# Add your own data later
```

## Database Schema

### Tables

#### 🏪 **stores**
Store locations and information
- `id` - Primary key
- `name` - Store name
- `address`, `city`, `state`, `postal_code`, `country` - Location details
- `phone`, `email`, `website` - Contact information
- `opening_hours` - JSONB with operating hours
- `latitude`, `longitude` - GPS coordinates
- `created_at`, `updated_at` - Timestamps

#### 📦 **products**
Product catalog
- `id` - Primary key
- `name` - Product name
- `description` - Product description
- `category` - Product category
- `barcode` - Product barcode
- `image_url` - Product image URL
- `created_at`, `updated_at` - Timestamps

#### 📊 **inventory**
Product availability at stores
- `id` - Primary key
- `store_id` - Foreign key to stores
- `product_id` - Foreign key to products
- `quantity` - Available quantity
- `price` - Product price at this store
- `last_updated` - Last inventory update
- **Unique constraint:** (store_id, product_id)

#### 👤 **users**
User accounts (Firebase integration)
- `id` - Primary key
- `firebase_uid` - Firebase user ID (unique)
- `email` - User email (unique)
- `display_name` - User display name
- `home_location` - User's home location (PostGIS POINT)
- `created_at`, `updated_at` - Timestamps

#### 🔍 **search_history**
User search history
- `id` - Primary key
- `user_id` - Foreign key to users
- `search_term` - What the user searched for
- `latitude`, `longitude` - Where the search was performed
- `created_at` - When the search was performed

### Indexes

- **Geospatial index** on stores location for fast proximity queries
- **Foreign key indexes** on inventory for fast joins
- **Text search index** on product names
- **User search history indexes** for fast profile queries

## Sample Data

The `complete-sample-data.sql` includes:

### 🏪 **5 Stores**
- Big Bazaar Phoenix (Mumbai)
- Reliance Fresh FC Road (Pune)
- Spencer's HITEC City (Hyderabad)
- More Megastore CP (New Delhi)
- DMart Whitefield (Bangalore)

### 📦 **14 Products**
- **Groceries:** Aashirvaad Atta, Tata Sampann Besan, India Gate Rice, Saffola Oil, Amul Milk, Britannia Bread, Tata Tea
- **Personal Care:** Colgate Toothpaste, Head & Shoulders Shampoo, Dettol Soap
- **Household:** Surf Excel Detergent, Vim Dishwash Gel
- **Electronics:** Samsung Galaxy A54 5G, boAt Airdopes 131

### 📊 **50+ Inventory Entries**
Products distributed across stores with realistic quantities and prices in Indian Rupees.

## Verification

After setup, verify your database:

```sql
-- Check tables
\dt

-- Check sample data counts
SELECT 'stores' as table_name, COUNT(*) FROM stores
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'inventory', COUNT(*) FROM inventory;

-- Test geospatial functionality
SELECT name, city, 
       ST_AsText(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) as location
FROM stores LIMIT 3;

-- Test search functionality
SELECT s.name, p.name, i.quantity, i.price
FROM inventory i
JOIN stores s ON i.store_id = s.id
JOIN products p ON i.product_id = p.id
WHERE p.name ILIKE '%Aashirvaad%';
```

## Configuration

Update your Spring Boot `application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/shopit
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

## Troubleshooting

### PostGIS Extension Error
```sql
-- If PostGIS extension fails to create
CREATE EXTENSION IF NOT EXISTS postgis;
-- May require superuser privileges
```

### Permission Issues
```bash
# Grant privileges to your user
psql -c "GRANT ALL PRIVILEGES ON DATABASE shopit TO your_username;"
```

### Connection Issues
```bash
# Test connection
psql -h localhost -U your_username -d shopit -c "SELECT 1;"
```

### Schema Validation Errors
```sql
-- Check if all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

## Production Considerations

1. **Backup Strategy:** Regular backups of production data
2. **Index Maintenance:** Monitor and maintain indexes
3. **Connection Pooling:** Configure appropriate connection pool size
4. **Security:** Use strong passwords and limit database access
5. **Monitoring:** Set up database monitoring and alerts

## Migration Scripts

For schema changes, create migration scripts in `database/migrations/`:

```sql
-- Example: database/migrations/001_add_store_rating.sql
ALTER TABLE stores ADD COLUMN rating DECIMAL(2,1) DEFAULT 0.0;
CREATE INDEX idx_stores_rating ON stores(rating);
```

This ensures your database is properly set up and ready for the ShopIt application! 🚀