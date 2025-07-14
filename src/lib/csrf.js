import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

const CSRF_TOKEN_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_SECRET_NAME = 'csrf_secret';

// Generate a CSRF token
export function generateCSRFToken() {
  return randomBytes(32).toString('hex');
}

// Create and store CSRF token
export async function createCSRFToken() {
  const token = generateCSRFToken();
  const secret = randomBytes(32).toString('hex');
  
  const cookieStore = cookies();
  
  // Store secret in httpOnly cookie
  cookieStore.set(CSRF_SECRET_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });
  
  // Store token in regular cookie (accessible by JS)
  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });
  
  return { token, secret };
}

// Verify CSRF token
export async function verifyCSRFToken(request) {
  // Skip CSRF check for GET requests
  if (request.method === 'GET') {
    return true;
  }
  
  const cookieStore = cookies();
  const storedToken = cookieStore.get(CSRF_TOKEN_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  
  // Check if tokens exist and match
  if (!storedToken || !headerToken || storedToken !== headerToken) {
    return false;
  }
  
  return true;
}

// Middleware to check CSRF token
export async function csrfProtection(request) {
  const isValid = await verifyCSRFToken(request);
  
  if (!isValid) {
    return new Response(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  return null; // Continue with request
}