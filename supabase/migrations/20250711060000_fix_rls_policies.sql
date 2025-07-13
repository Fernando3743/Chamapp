-- Fix RLS policies to use email instead of ID matching
-- Drop existing policies
DROP POLICY IF EXISTS "User can view own data" ON "user";
DROP POLICY IF EXISTS "User can update own data" ON "user";

-- Create new RLS policies based on email matching
-- User can only view their own data (match by email)
CREATE POLICY "User can view own data" ON "user"
    FOR SELECT USING (auth.email() = email);

-- User can update their own data (match by email)  
CREATE POLICY "User can update own data" ON "user"
    FOR UPDATE USING (auth.email() = email);