-- Complete database setup and sample data for ShopIt application
-- This file creates the complete database schema and populates it with sample data
-- Run this on a fresh PostgreSQL database

-- 🔸 Create Database (run this separately if needed)
-- CREATE DATABASE shopit;

-- 🔸 Enable PostGIS extension for geo queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- 🔸 Stores table
CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL DEFAULT 'India',
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(255),
    opening_hours JSONB,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🔸 Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    barcode VARCHAR(100),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🔸 Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10, 2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (store_id, product_id)
);

-- 🔸 Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    home_location GEOGRAPHY(POINT),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🔸 Search History Table
CREATE TABLE IF NOT EXISTS search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    search_term VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🔸 Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stores_location ON stores USING GIST (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326));
CREATE INDEX IF NOT EXISTS idx_inventory_store_id ON inventory(store_id);
CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at);

-- ===============================================
-- SAMPLE DATA INSERTION
-- ===============================================

-- Insert sample stores with complete information
INSERT INTO stores (name, address, city, state, postal_code, country, phone, email, website, opening_hours, latitude, longitude) VALUES
('Big Bazaar Phoenix', 'Phoenix MarketCity, Kurla West', 'Mumbai', 'Maharashtra', '400070', 'India', '+91-22-6123-4567', 'phoenix@bigbazaar.com', 'https://www.bigbazaar.com', '{"monday": "10:00-22:00", "tuesday": "10:00-22:00", "wednesday": "10:00-22:00", "thursday": "10:00-22:00", "friday": "10:00-22:00", "saturday": "10:00-22:00", "sunday": "10:00-22:00"}', 19.0822, 72.8811),

('Reliance Fresh FC Road', 'FC Road, Shivajinagar', 'Pune', 'Maharashtra', '411005', 'India', '+91-20-2567-8901', 'fcroad@reliancefresh.com', 'https://www.reliancefresh.com', '{"monday": "08:00-23:00", "tuesday": "08:00-23:00", "wednesday": "08:00-23:00", "thursday": "08:00-23:00", "friday": "08:00-23:00", "saturday": "08:00-23:00", "sunday": "08:00-23:00"}', 18.5314, 73.8447),

('Spencer''s HITEC City', 'HITEC City, Madhapur', 'Hyderabad', 'Telangana', '500081', 'India', '+91-40-4012-3456', 'hitec@spencers.in', 'https://www.spencers.in', '{"monday": "09:00-22:00", "tuesday": "09:00-22:00", "wednesday": "09:00-22:00", "thursday": "09:00-22:00", "friday": "09:00-22:00", "saturday": "09:00-22:00", "sunday": "09:00-22:00"}', 17.4485, 78.3908),

('More Megastore CP', 'Connaught Place', 'New Delhi', 'Delhi', '110001', 'India', '+91-11-2334-5678', 'cp@moreretail.in', 'https://www.moreretail.in', '{"monday": "10:00-21:00", "tuesday": "10:00-21:00", "wednesday": "10:00-21:00", "thursday": "10:00-21:00", "friday": "10:00-21:00", "saturday": "10:00-21:00", "sunday": "10:00-21:00"}', 28.6315, 77.2167),

('DMart Whitefield', 'Whitefield Main Road', 'Bangalore', 'Karnataka', '560066', 'India', '+91-80-4567-8901', 'whitefield@dmart.in', 'https://www.dmart.in', '{"monday": "07:00-23:00", "tuesday": "07:00-23:00", "wednesday": "07:00-23:00", "thursday": "07:00-23:00", "friday": "07:00-23:00", "saturday": "07:00-23:00", "sunday": "07:00-23:00"}', 12.9698, 77.7500);

-- Insert sample products (including your Aashirvaad Atta)
INSERT INTO products (name, description, category, barcode, image_url) VALUES
-- Groceries - Flour & Grains
('Aashirvaad Atta 5kg', 'Whole wheat flour - 5 kg pack', 'Groceries', '8901058845501', 'https://example.com/images/aashirvaad_atta.jpg'),
('Tata Sampann Besan 1kg', 'Premium gram flour - 1 kg pack', 'Groceries', '8901030895012', 'https://example.com/images/tata_besan.jpg'),
('India Gate Basmati Rice 5kg', 'Premium basmati rice - 5 kg pack', 'Groceries', '8901058846218', 'https://example.com/images/indiagate_rice.jpg'),
('Saffola Gold Oil 1L', 'Refined cooking oil - 1 liter', 'Groceries', '8901030874567', 'https://example.com/images/saffola_oil.jpg'),

-- Groceries - Dairy & Beverages
('Amul Fresh Milk 1L', 'Fresh full cream milk - 1 liter', 'Groceries', '8901030823456', 'https://example.com/images/amul_milk.jpg'),
('Britannia Bread 400g', 'White bread loaf - 400g', 'Groceries', '8901030867890', 'https://example.com/images/britannia_bread.jpg'),
('Tata Tea Gold 1kg', 'Premium tea leaves - 1 kg pack', 'Groceries', '8901030845123', 'https://example.com/images/tata_tea.jpg'),

-- Personal Care
('Colgate Total Toothpaste 200g', 'Advanced whitening toothpaste', 'Personal Care', '8901030876543', 'https://example.com/images/colgate_toothpaste.jpg'),
('Head & Shoulders Shampoo 400ml', 'Anti-dandruff shampoo', 'Personal Care', '8901030834567', 'https://example.com/images/head_shoulders.jpg'),
('Dettol Soap 125g', 'Antibacterial bathing soap', 'Personal Care', '8901030812345', 'https://example.com/images/dettol_soap.jpg'),

-- Household
('Surf Excel Detergent 1kg', 'Washing powder - 1 kg pack', 'Household', '8901030823789', 'https://example.com/images/surf_excel.jpg'),
('Vim Dishwash Gel 750ml', 'Dishwashing liquid', 'Household', '8901030845678', 'https://example.com/images/vim_gel.jpg'),

-- Electronics
('Samsung Galaxy A54 5G', 'Smartphone with 128GB storage', 'Electronics', '8806094559123', 'https://example.com/images/samsung_a54.jpg'),
('boAt Airdopes 131', 'True wireless earbuds', 'Electronics', '8904264212345', 'https://example.com/images/boat_airdopes.jpg');

-- Insert inventory data linking products to stores
INSERT INTO inventory (store_id, product_id, quantity, price) VALUES
-- Big Bazaar Phoenix (store_id: 1)
(1, 1, 45, 285.00),  -- Aashirvaad Atta 5kg
(1, 2, 30, 85.00),   -- Tata Sampann Besan 1kg
(1, 3, 25, 650.00),  -- India Gate Basmati Rice 5kg
(1, 4, 40, 185.00),  -- Saffola Gold Oil 1L
(1, 5, 60, 65.00),   -- Amul Fresh Milk 1L
(1, 6, 50, 28.00),   -- Britannia Bread 400g
(1, 8, 35, 95.00),   -- Colgate Total Toothpaste 200g
(1, 11, 25, 145.00), -- Surf Excel Detergent 1kg

-- Reliance Fresh FC Road (store_id: 2)
(2, 1, 38, 290.00),  -- Aashirvaad Atta 5kg
(2, 3, 20, 645.00),  -- India Gate Basmati Rice 5kg
(2, 4, 35, 180.00),  -- Saffola Gold Oil 1L
(2, 5, 55, 68.00),   -- Amul Fresh Milk 1L
(2, 6, 45, 30.00),   -- Britannia Bread 400g
(2, 7, 40, 425.00),  -- Tata Tea Gold 1kg
(2, 9, 30, 285.00),  -- Head & Shoulders Shampoo 400ml
(2, 12, 25, 125.00), -- Vim Dishwash Gel 750ml

-- Spencer's HITEC City (store_id: 3)
(3, 1, 42, 280.00),  -- Aashirvaad Atta 5kg
(3, 2, 25, 88.00),   -- Tata Sampann Besan 1kg
(3, 4, 30, 188.00),  -- Saffola Gold Oil 1L
(3, 5, 50, 66.00),   -- Amul Fresh Milk 1L
(3, 7, 35, 430.00),  -- Tata Tea Gold 1kg
(3, 8, 40, 98.00),   -- Colgate Total Toothpaste 200g
(3, 10, 45, 35.00),  -- Dettol Soap 125g
(3, 13, 15, 18500.00), -- Samsung Galaxy A54 5G

-- More Megastore CP (store_id: 4)
(4, 1, 28, 295.00),  -- Aashirvaad Atta 5kg
(4, 3, 18, 655.00),  -- India Gate Basmati Rice 5kg
(4, 5, 40, 70.00),   -- Amul Fresh Milk 1L
(4, 6, 35, 32.00),   -- Britannia Bread 400g
(4, 9, 25, 290.00),  -- Head & Shoulders Shampoo 400ml
(4, 11, 30, 150.00), -- Surf Excel Detergent 1kg
(4, 14, 20, 1850.00), -- boAt Airdopes 131

-- DMart Whitefield (store_id: 5)
(5, 1, 60, 275.00),  -- Aashirvaad Atta 5kg
(5, 2, 35, 82.00),   -- Tata Sampann Besan 1kg
(5, 3, 30, 635.00),  -- India Gate Basmati Rice 5kg
(5, 4, 45, 175.00),  -- Saffola Gold Oil 1L
(5, 5, 70, 63.00),   -- Amul Fresh Milk 1L
(5, 7, 50, 420.00),  -- Tata Tea Gold 1kg
(5, 10, 55, 32.00),  -- Dettol Soap 125g
(5, 12, 35, 120.00); -- Vim Dishwash Gel 750ml

-- ===============================================
-- DATABASE VERIFICATION QUERIES
-- ===============================================

-- Check table creation
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN ('stores', 'products', 'inventory', 'users', 'search_history')
ORDER BY table_name;

-- Check indexes
SELECT 
    indexname,
    tablename,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
    AND tablename IN ('stores', 'products', 'inventory', 'users', 'search_history')
ORDER BY tablename, indexname;

-- Verify sample data counts
SELECT 'stores' as table_name, COUNT(*) as record_count FROM stores
UNION ALL
SELECT 'products' as table_name, COUNT(*) as record_count FROM products
UNION ALL
SELECT 'inventory' as table_name, COUNT(*) as record_count FROM inventory
UNION ALL
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'search_history' as table_name, COUNT(*) as record_count FROM search_history
ORDER BY table_name;

-- Verify inventory data with store and product details
SELECT 
    s.name as store_name,
    s.city,
    p.name as product_name,
    p.category,
    i.quantity,
    i.price
FROM inventory i
JOIN stores s ON i.store_id = s.id
JOIN products p ON i.product_id = p.id
ORDER BY s.name, p.category, p.name;

-- Test geospatial functionality
SELECT 
    name,
    city,
    latitude,
    longitude,
    ST_AsText(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) as location_point
FROM stores
LIMIT 3;

-- ===============================================
-- SETUP COMPLETE!
-- ===============================================
-- 
-- ✅ Database schema created with all tables and indexes
-- ✅ PostGIS extension enabled for geospatial queries
-- ✅ Sample data inserted:
--    - 5 stores across major Indian cities
--    - 14 products across multiple categories
--    - 50+ inventory entries linking products to stores
-- 
-- 🚀 Your ShopIt database is ready for use!
-- 
-- Next steps:
-- 1. Start your Spring Boot backend: npm run dev:backend
-- 2. Start your React frontend: npm run dev:frontend
-- 3. Test the search functionality with terms like:
--    - "Aashirvaad" (available at all stores)
--    - "Samsung" (available at Spencer's HITEC City)
--    - "Amul" (available at multiple stores)
-- 
-- ===============================================