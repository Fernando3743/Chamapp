import { NextResponse } from 'next/server';
import { createCSRFToken } from '../../../lib/csrf';

export async function GET() {
  const { token } = await createCSRFToken();
  
  return NextResponse.json({
    token
  });
}