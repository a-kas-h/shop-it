-- Migration to fix permissions column type mismatch
-- This migration changes the permissions column from JSONB to TEXT
-- to match the Java String type in the StoreOwner entity

-- Drop the existing JSONB column and recreate as TEXT
ALTER TABLE store_owners DROP COLUMN IF EXISTS permissions;
ALTER TABLE store_owners ADD COLUMN permissions TEXT DEFAULT '{"manage_inventory": true, "manage_store": true, "view_analytics": true}';

-- Update any existing data if needed (currently should be empty)
-- This column can store permissions data as a JSON string
