-- Migration to fix home_location column type mismatch
-- This migration changes the home_location column from GEOGRAPHY(POINT) to TEXT
-- to match the Java String type in the User entity

-- Drop the existing geography column and recreate as TEXT
ALTER TABLE users DROP COLUMN IF EXISTS home_location;
ALTER TABLE users ADD COLUMN home_location TEXT;

-- Update any existing data if needed (currently should be empty)
-- This column can store location data as a string format like "lat,lng" or JSON
