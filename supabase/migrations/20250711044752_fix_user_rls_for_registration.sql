-- Drop existing policies
DROP POLICY IF EXISTS "User can view own data" ON "user";
DROP POLICY IF EXISTS "User can update own data" ON "user";
DROP POLICY IF EXISTS "Anyone can insert user" ON "user";

-- Create new RLS policies that work with registration
-- Allow anyone to insert (for registration)
CREATE POLICY "Enable insert for registration" ON "user"
    FOR INSERT WITH CHECK (true);

-- Users can only view their own data (after they're authenticated)
CREATE POLICY "Users can view own data" ON "user"
    FOR SELECT USING (auth.uid()::text = id::text);

-- Users can update their own data (after they're authenticated)
CREATE POLICY "Users can update own data" ON "user"
    FOR UPDATE USING (auth.uid()::text = id::text);