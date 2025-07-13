import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required environment variables');
}

// Create service role client for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (body.password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('user')
      .select('id')
      .eq('email', body.email)
      .maybeSingle();
    
    if (checkError) {
      console.error('Database connection error:', checkError);
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, 12);

    // Insert user into database
    const { data: user, error: userError } = await supabaseAdmin
      .from('user')
      .insert([{
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        password_hash: passwordHash,
        phone: body.phone || null,
        date_of_birth: body.dateOfBirth || null,
        email_verified: true
      }])
      .select()
      .single();

    if (userError) {
      console.error('User insertion error:', userError);
      return NextResponse.json(
        { success: false, error: `Failed to create user account: ${userError.message}` },
        { status: 500 }
      );
    }

    // Create auth user with Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true, // Auto-confirm email for local development
      user_metadata: {
        first_name: body.firstName,
        last_name: body.lastName,
        custom_user_id: user.id
      }
    });

    if (authError) {
      // Rollback user creation if auth fails
      await supabaseAdmin.from('user').delete().eq('id', user.id);
      console.error('Auth user creation error:', authError);
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        authUser: authUser.user
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
    { message: 'User registration API endpoint. Use POST to register a user.' },
    { status: 405 }
  );
}