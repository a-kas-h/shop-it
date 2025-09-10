-- Migration to fix opening_hours column type mismatch
-- This migration changes the opening_hours column from JSONB to TEXT
-- to match the Java String type in the Store entity

-- Drop the existing JSONB column and recreate as TEXT
ALTER TABLE stores DROP COLUMN IF EXISTS opening_hours;
ALTER TABLE stores ADD COLUMN opening_hours TEXT;

-- Update any existing data if needed (currently should be empty)
-- This column can store opening hours data as a string format or JSON string
