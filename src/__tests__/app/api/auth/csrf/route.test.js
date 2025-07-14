import { GET } from '../../../../../app/api/csrf/route';
import { createCSRFToken } from '../../../../../lib/csrf';

// Mock the csrf module
jest.mock('../../../../../lib/csrf', () => ({
  createCSRFToken: jest.fn(),
}));

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data) => {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      });
    }
  }
}));

describe('/api/csrf', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates and returns a CSRF token', async () => {
    const mockToken = 'test-csrf-token-123';
    createCSRFToken.mockResolvedValue({ token: mockToken, secret: 'test-secret' });

    const response = await GET();
    const data = await response.json();

    expect(createCSRFToken).toHaveBeenCalled();
    expect(data.token).toBe(mockToken);
    expect(response.status).toBe(200);
  });

  it('returns correct content type', async () => {
    createCSRFToken.mockResolvedValue({ token: 'test-token', secret: 'test-secret' });

    const response = await GET();

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('handles token generation consistently', async () => {
    const tokens = ['token1', 'token2', 'token3'];
    let callCount = 0;
    
    createCSRFToken.mockImplementation(async () => {
      const token = tokens[callCount++];
      return { token, secret: `secret-${token}` };
    });

    // Multiple requests should get different tokens
    for (let i = 0; i < 3; i++) {
      const response = await GET();
      const data = await response.json();
      expect(data.token).toBe(tokens[i]);
    }
  });
});