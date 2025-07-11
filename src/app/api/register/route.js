import { NextResponse } from 'next/server';
import { registerBusiness } from '../../../lib/businessRegistration';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'businessName', 'businessType', 'description', 'address', 
      'city', 'state', 'zipCode', 'phone', 'email', 'ownerName', 
      'ownerEmail', 'password'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Call the registration function
    const result = await registerBusiness(body);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
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
    { message: 'Registration API endpoint. Use POST to register a business.' },
    { status: 405 }
  );
}