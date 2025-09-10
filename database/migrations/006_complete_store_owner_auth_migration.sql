-- Migration to complete the store owner auth system migration
-- This fixes the remaining user_id constraint issues

-- First, make user_id nullable temporarily if there are any records
UPDATE store_owners SET user_id = NULL WHERE user_id IS NOT NULL AND store_owner_auth_id IS NOT NULL;

-- Drop the NOT NULL constraint on user_id first
ALTER TABLE store_owners ALTER COLUMN user_id DROP NOT NULL;

-- Drop the foreign key constraint on user_id if it exists
ALTER TABLE store_owners DROP CONSTRAINT IF EXISTS fk_store_owner_user;

-- Now safely drop the user_id column
ALTER TABLE store_owners DROP COLUMN IF EXISTS user_id;

-- Make store_owner_auth_id NOT NULL since it's the new primary reference
ALTER TABLE store_owners ALTER COLUMN store_owner_auth_id SET NOT NULL;

-- Verify the change
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'store_owners' 
ORDER BY ordinal_position;
