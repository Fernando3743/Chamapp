import { POST } from '../../../../../app/api/auth/login/route';
import { authRateLimiter, rateLimitMiddleware } from '../../../../../lib/rateLimiter';
import { csrfProtection } from '../../../../../lib/csrf';
import { supabase } from '../../../../../lib/supabase';

// Mock dependencies
jest.mock('../../../../../lib/rateLimiter');
jest.mock('../../../../../lib/csrf');
jest.mock('../../../../../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

describe('/api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    rateLimitMiddleware.mockResolvedValue(null); // No rate limit error
    csrfProtection.mockResolvedValue(null); // No CSRF error
  });

  it('requires email and password', async () => {
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Email and password are required');
    expect(data.code).toBe('missing_fields');
  });

  it('checks CSRF protection', async () => {
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    await POST(request);

    expect(csrfProtection).toHaveBeenCalledWith(request);
  });

  it('enforces rate limiting', async () => {
    const rateLimitResponse = new Response(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429 }
    );
    rateLimitMiddleware.mockResolvedValueOnce(rateLimitResponse);

    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.1',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    expect(response).toBe(rateLimitResponse);
    expect(rateLimitMiddleware).toHaveBeenCalledWith(request, authRateLimiter);
  });

  it('successfully signs in user', async () => {
    const mockUser = { 
      id: '123', 
      email: 'test@example.com',
      email_confirmed_at: '2024-01-01',
      created_at: '2024-01-01',
      user_metadata: {}
    };
    const mockSession = { access_token: 'token123' };

    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user.email).toBe('test@example.com');
    expect(data.session).toEqual(mockSession);
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('handles invalid credentials', async () => {
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' },
    });

    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.message).toBe('Invalid email or password');
    expect(data.code).toBe('invalid_credentials');
  });

  it('handles CSRF protection rejection', async () => {
    const csrfError = new Response(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      { status: 403 }
    );
    csrfProtection.mockResolvedValueOnce(csrfError);

    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const response = await POST(request);

    expect(response).toBe(csrfError);
    expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
  });

  it('handles malformed JSON', async () => {
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe('Server error occurred');
    expect(data.code).toBe('server_error');
  });
});