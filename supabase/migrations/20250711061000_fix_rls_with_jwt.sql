-- Fix RLS policies to use JWT email claim
-- Drop existing policies
DROP POLICY IF EXISTS "User can view own data" ON "user";
DROP POLICY IF EXISTS "User can update own data" ON "user";

-- Create new RLS policies based on JWT email claim
-- User can only view their own data (match by email from JWT)
CREATE POLICY "User can view own data" ON "user"
    FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- User can update their own data (match by email from JWT)  
CREATE POLICY "User can update own data" ON "user"
    FOR UPDATE USING (auth.jwt() ->> 'email' = email);