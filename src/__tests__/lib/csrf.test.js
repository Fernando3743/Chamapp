import { generateCSRFToken, verifyCSRFToken, csrfProtection, createCSRFToken } from '../../lib/csrf';
import { cookies } from 'next/headers';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn()
}));

// Mock crypto
jest.mock('crypto', () => ({
  randomBytes: jest.fn((size) => ({
    toString: (encoding) => `mock-token-${size}-${encoding}`
  }))
}));

describe('CSRF Protection', () => {
  let mockCookieStore;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn()
    };
    cookies.mockReturnValue(mockCookieStore);
  });

  describe('generateCSRFToken', () => {
    it('generates a unique token', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();

      expect(token1).toBeTruthy();
      expect(token2).toBeTruthy();
      expect(token1).toBe('mock-token-32-hex');
    });
  });

  describe('createCSRFToken', () => {
    it('creates and stores token and secret', async () => {
      const result = await createCSRFToken();

      expect(result.token).toBe('mock-token-32-hex');
      expect(result.secret).toBe('mock-token-32-hex');
      
      // Should set both cookies
      expect(mockCookieStore.set).toHaveBeenCalledTimes(2);
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'csrf_secret',
        'mock-token-32-hex',
        expect.objectContaining({
          httpOnly: true,
          secure: false, // NODE_ENV is 'test'
          sameSite: 'strict',
          path: '/',
          maxAge: 86400
        })
      );
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'csrf_token',
        'mock-token-32-hex',
        expect.objectContaining({
          httpOnly: false,
          secure: false,
          sameSite: 'strict',
          path: '/',
          maxAge: 86400
        })
      );
    });
  });

  describe('verifyCSRFToken', () => {
    it('returns false for missing token', async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      
      const request = new Request('http://localhost:3000/api/test', {
        method: 'POST',
      });

      const isValid = await verifyCSRFToken(request);
      expect(isValid).toBe(false);
    });

    it('returns false for invalid token', async () => {
      mockCookieStore.get.mockReturnValue({ value: 'stored-token' });
      
      const request = new Request('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'x-csrf-token': 'invalid-token',
        },
      });

      const isValid = await verifyCSRFToken(request);
      expect(isValid).toBe(false);
    });

    it('returns true for valid token', async () => {
      const token = 'valid-token';
      mockCookieStore.get.mockReturnValue({ value: token });
      
      const request = new Request('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'x-csrf-token': token,
        },
      });

      const isValid = await verifyCSRFToken(request);
      expect(isValid).toBe(true);
    });

    it('returns true for GET requests without token', async () => {
      const request = new Request('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const isValid = await verifyCSRFToken(request);
      expect(isValid).toBe(true);
      expect(mockCookieStore.get).not.toHaveBeenCalled();
    });
  });

  describe('csrfProtection middleware', () => {
    it('allows GET requests', async () => {
      const request = new Request('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const response = await csrfProtection(request);
      expect(response).toBeNull();
    });

    it('blocks POST requests without token', async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      
      const request = new Request('http://localhost:3000/api/test', {
        method: 'POST',
      });

      const response = await csrfProtection(request);
      expect(response).toBeDefined();
      expect(response.status).toBe(403);

      const data = await response.json();
      expect(data.error).toBe('Invalid CSRF token');
    });

    it('allows POST requests with valid token', async () => {
      const token = 'valid-token';
      mockCookieStore.get.mockReturnValue({ value: token });
      
      const request = new Request('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'x-csrf-token': token,
        },
      });

      const response = await csrfProtection(request);
      expect(response).toBeNull();
    });

    it('blocks PUT requests without token', async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      
      const request = new Request('http://localhost:3000/api/test', {
        method: 'PUT',
      });

      const response = await csrfProtection(request);
      expect(response).toBeDefined();
      expect(response.status).toBe(403);
    });

    it('blocks DELETE requests without token', async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      
      const request = new Request('http://localhost:3000/api/test', {
        method: 'DELETE',
      });

      const response = await csrfProtection(request);
      expect(response).toBeDefined();
      expect(response.status).toBe(403);
    });
  });
});