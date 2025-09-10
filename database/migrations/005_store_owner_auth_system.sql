-- Migration to add store_owner_auth table and update store_owners table
-- Run this migration script in PostgreSQL

-- Create store_owner_auth table
CREATE TABLE store_owner_auth (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    business_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_store_owner_auth_email ON store_owner_auth(email);
CREATE INDEX idx_store_owner_auth_active ON store_owner_auth(is_active);

-- Create a sample store owner auth record
INSERT INTO store_owner_auth (email, password_hash, first_name, last_name, business_name) 
VALUES ('akashsaminathan24@gmail.com', '$2a$10$example.hash.for.password', 'Akash', 'Saminathan', 'Akash Business');

-- Add new column to store_owners table
ALTER TABLE store_owners ADD COLUMN store_owner_auth_id BIGINT;

-- Update existing records to use the new store_owner_auth
UPDATE store_owners SET store_owner_auth_id = 1 WHERE user_id = 4;

-- Add foreign key constraint
ALTER TABLE store_owners ADD CONSTRAINT fk_store_owner_auth 
    FOREIGN KEY (store_owner_auth_id) REFERENCES store_owner_auth(id);

-- Drop the old user_id column (after verification)
-- ALTER TABLE store_owners DROP COLUMN user_id;

-- Add NOT NULL constraint after data migration
-- ALTER TABLE store_owners ALTER COLUMN store_owner_auth_id SET NOT NULL;
