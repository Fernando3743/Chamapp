-- Confirm all existing users by setting email_confirmed_at timestamp
-- This allows existing users to login without email confirmation

UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    updated_at = NOW()
WHERE email_confirmed_at IS NULL;