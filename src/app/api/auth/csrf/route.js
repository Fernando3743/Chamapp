import { NextResponse } from 'next/server';
import { generateCSRFToken } from '../../../../lib/csrf';

export async function GET() {
  const csrfToken = generateCSRFToken();
  
  const response = NextResponse.json({ csrfToken });
  
  // Set CSRF token in cookie
  response.cookies.set('csrf_token', csrfToken, {
    httpOnly: false, // Must be false so JavaScript can read it
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return response;
}