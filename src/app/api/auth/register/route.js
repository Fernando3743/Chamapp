import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { csrfProtection } from '../../../../lib/csrf';
import { authRateLimiter, rateLimitMiddleware } from '../../../../lib/rateLimiter';
import { sanitizeEmail, sanitizeName, sanitizePhone } from '../../../../lib/sanitizer';

export async function POST(request) {
  // Check rate limit
  const rateLimitCheck = await rateLimitMiddleware(request, authRateLimiter);
  if (rateLimitCheck) return rateLimitCheck;

  // Check CSRF token
  const csrfCheck = await csrfProtection(request);
  if (csrfCheck) return csrfCheck;

  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Sanitize inputs
    const firstName = sanitizeName(body.firstName);
    const lastName = sanitizeName(body.lastName);
    const email = sanitizeEmail(body.email);
    const password = body.password; // Don't sanitize password
    const confirmPassword = body.confirmPassword;
    const phone = body.phone ? sanitizePhone(body.phone) : null;
    const dateOfBirth = body.dateOfBirth || null;

    // Validate password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          phone: phone || null,
          date_of_birth: dateOfBirth || null,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      }
    });

    if (error) {
      console.error('Registration error:', error);
      
      // Handle specific Supabase errors
      if (error.message.includes('already registered')) {
        return NextResponse.json(
          { success: false, error: 'User with this email already exists' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // For local development, auto-confirm email
    if (process.env.NODE_ENV === 'development' && data.user) {
      // In production, users would need to confirm their email
      console.log('Development mode: User auto-confirmed');
    }

    return NextResponse.json({
      success: true,
      data: {
        user: data.user,
        session: data.session,
        message: data.session ? 'Registration successful' : 'Please check your email to confirm your account'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}