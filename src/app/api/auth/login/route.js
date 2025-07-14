import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { csrfProtection } from '../../../../lib/csrf';
import { authRateLimiter, rateLimitMiddleware } from '../../../../lib/rateLimiter';
import { sanitizeEmail } from '../../../../lib/sanitizer';

export async function POST(request) {
  // Check rate limit
  const rateLimitCheck = await rateLimitMiddleware(request, authRateLimiter);
  if (rateLimitCheck) return rateLimitCheck;

  // Check CSRF token
  const csrfCheck = await csrfProtection(request);
  if (csrfCheck) return csrfCheck;

  try {
    const body = await request.json();
    const email = sanitizeEmail(body.email || '');
    const password = body.password; // Don't sanitize password

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Email and password are required',
          code: 'missing_fields'
        },
        { status: 400 }
      );
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase login error:', error);
      
      // Map Supabase errors to our error codes
      let errorCode = 'login_failed';
      let errorMessage = 'Login failed';
      
      switch (error.message) {
        case 'Invalid login credentials':
          errorCode = 'invalid_credentials';
          errorMessage = 'Invalid email or password';
          break;
        case 'Email not confirmed':
          errorCode = 'email_not_verified';
          errorMessage = 'Please verify your email address before signing in';
          break;
        case 'Too many requests':
          errorCode = 'too_many_attempts';
          errorMessage = 'Too many login attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message || 'Login failed';
      }

      return NextResponse.json(
        { 
          success: false,
          message: errorMessage,
          code: errorCode
        },
        { status: 401 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Authentication failed',
          code: 'auth_failed'
        },
        { status: 401 }
      );
    }

    // Create user data from Supabase response
    const userData = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name || 
            data.user.user_metadata?.name || 
            data.user.email?.split('@')[0] || 'User',
      role: data.user.user_metadata?.role || 'user',
      avatar: data.user.user_metadata?.avatar_url || null,
      isVerified: data.user.email_confirmed_at !== null,
      createdAt: data.user.created_at,
      lastLogin: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData,
      session: data.session,
      token: data.session?.access_token
    });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Server error occurred',
        code: 'server_error' 
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}