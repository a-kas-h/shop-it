-- Migration: Add manufacturing_date and expiry_date to products table
-- Run this on existing databases to add the new columns

-- Add new columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS manufacturing_date DATE,
ADD COLUMN IF NOT EXISTS expiry_date DATE;

-- Update existing products with sample dates (optional)
-- You can customize these dates based on your needs

UPDATE products SET 
    manufacturing_date = '2024-01-15',
    expiry_date = '2025-01-15'
WHERE name = 'Aashirvaad Atta 5kg';

UPDATE products SET 
    manufacturing_date = '2024-02-10',
    expiry_date = '2025-02-10'
WHERE name LIKE '%Besan%';

UPDATE products SET 
    manufacturing_date = '2024-01-20',
    expiry_date = '2026-01-20'
WHERE name LIKE '%Rice%';

UPDATE products SET 
    manufacturing_date = '2024-03-05',
    expiry_date = '2025-09-05'
WHERE name LIKE '%Oil%';

-- Dairy products (shorter shelf life)
UPDATE products SET 
    manufacturing_date = CURRENT_DATE - INTERVAL '2 days',
    expiry_date = CURRENT_DATE + INTERVAL '3 days'
WHERE name LIKE '%Milk%';

UPDATE products SET 
    manufacturing_date = CURRENT_DATE - INTERVAL '3 days',
    expiry_date = CURRENT_DATE + INTERVAL '4 days'
WHERE name LIKE '%Bread%';

-- Personal care products (longer shelf life)
UPDATE products SET 
    manufacturing_date = '2024-02-15',
    expiry_date = '2027-02-15'
WHERE category = 'Personal Care';

-- Household products (long shelf life)
UPDATE products SET 
    manufacturing_date = '2024-02-20',
    expiry_date = '2027-02-20'
WHERE category = 'Household';

-- Electronics (warranty period instead of expiry)
UPDATE products SET 
    manufacturing_date = '2024-01-05',
    expiry_date = '2026-01-05'
WHERE category = 'Electronics';

-- Verify the migration
SELECT 
    name,
    category,
    manufacturing_date,
    expiry_date,
    CASE 
        WHEN expiry_date < CURRENT_DATE THEN 'EXPIRED'
        WHEN expiry_date <= CURRENT_DATE + INTERVAL '7 days' THEN 'EXPIRING SOON'
        ELSE 'FRESH'
    END as status
FROM products
ORDER BY category, name;