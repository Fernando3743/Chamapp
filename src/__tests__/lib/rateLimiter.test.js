import { RateLimiter, authRateLimiter } from '../../lib/rateLimiter';

describe('RateLimiter', () => {
  let rateLimiter;

  beforeEach(() => {
    // Clear any existing rate limiter state
    jest.clearAllMocks();
    
    rateLimiter = new RateLimiter({
      windowSize: 60 * 1000, // 1 minute
      maxAttempts: 5
    });
    
    // Reset the internal attempts map for testing
    rateLimiter.reset('test-user');
    rateLimiter.reset('user1');
    rateLimiter.reset('user2');
  });

  it('allows requests within the limit', async () => {
    const mockRequest = new Request('http://localhost:3000/test', {
      headers: { 'x-forwarded-for': 'test-user' }
    });
    
    for (let i = 0; i < 5; i++) {
      const result = await rateLimiter.check(mockRequest, 'test-user');
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(5 - i - 1);
    }
  });

  it('blocks requests exceeding the limit', async () => {
    const mockRequest = new Request('http://localhost:3000/test', {
      headers: { 'x-forwarded-for': 'test-user' }
    });
    
    // Use up all attempts (remember the check increments count)
    for (let i = 0; i < 5; i++) {
      const result = await rateLimiter.check(mockRequest, 'test-user');
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(5 - i - 1);
    }
    
    // Next attempt should be blocked
    const blockedResult = await rateLimiter.check(mockRequest, 'test-user');
    expect(blockedResult.success).toBe(false);
    expect(blockedResult.remaining).toBe(0);
    expect(blockedResult.retryAfter).toBeGreaterThan(0);
  });

  it('resets after the time window', async () => {
    jest.useFakeTimers();
    const mockRequest = new Request('http://localhost:3000/test', {
      headers: { 'x-forwarded-for': 'test-user' }
    });
    
    // Use up all attempts
    for (let i = 0; i < 5; i++) {
      await rateLimiter.check(mockRequest, 'test-user');
    }
    
    const blockedResult = await rateLimiter.check(mockRequest, 'test-user');
    expect(blockedResult.success).toBe(false);
    
    // Fast forward past the time window
    jest.advanceTimersByTime(61 * 1000);
    
    // Should be allowed again
    const allowedResult = await rateLimiter.check(mockRequest, 'test-user');
    expect(allowedResult.success).toBe(true);
    
    jest.useRealTimers();
  });

  it('tracks different identifiers separately', async () => {
    const mockRequest1 = new Request('http://localhost:3000/test', {
      headers: { 'x-forwarded-for': 'user1' }
    });
    const mockRequest2 = new Request('http://localhost:3000/test', {
      headers: { 'x-forwarded-for': 'user2' }
    });
    
    // Use up all attempts for user1
    for (let i = 0; i < 5; i++) {
      const result = await rateLimiter.check(mockRequest1, 'user1');
      expect(result.success).toBe(true);
    }
    const blockedResult = await rateLimiter.check(mockRequest1, 'user1');
    expect(blockedResult.success).toBe(false);
    
    // user2 should still be allowed
    const user2Result = await rateLimiter.check(mockRequest2, 'user2');
    expect(user2Result.success).toBe(true);
  });

  it('cleans up expired entries', async () => {
    jest.useFakeTimers();
    
    // Create entries for multiple users
    for (let i = 0; i < 10; i++) {
      const mockRequest = new Request('http://localhost:3000/test', {
        headers: { 'x-forwarded-for': `user-${i}` }
      });
      await rateLimiter.check(mockRequest, `user-${i}`);
    }
    
    // Fast forward past the time window
    jest.advanceTimersByTime(61 * 1000);
    
    // Trigger cleanup by checking a new user
    const newRequest = new Request('http://localhost:3000/test', {
      headers: { 'x-forwarded-for': 'new-user' }
    });
    await rateLimiter.check(newRequest, 'new-user');
    
    // All old entries should be cleaned up
    for (let i = 0; i < 10; i++) {
      const mockRequest = new Request('http://localhost:3000/test', {
        headers: { 'x-forwarded-for': `user-${i}` }
      });
      const result = await rateLimiter.check(mockRequest, `user-${i}`);
      expect(result.success).toBe(true);
    }
    
    jest.useRealTimers();
  });

  describe('authRateLimiter', () => {
    it('is configured with correct settings', () => {
      expect(authRateLimiter).toBeInstanceOf(RateLimiter);
      expect(authRateLimiter.windowSize).toBe(15 * 60 * 1000); // 15 minutes
      expect(authRateLimiter.maxAttempts).toBe(5);
    });

    it('blocks after 5 attempts', async () => {
      const mockRequest = new Request('http://localhost:3000/test', {
        headers: { 'x-forwarded-for': 'test@example.com' }
      });
      
      for (let i = 0; i < 5; i++) {
        const result = await authRateLimiter.check(mockRequest, 'test@example.com');
        expect(result.success).toBe(true);
      }
      
      const blockedResult = await authRateLimiter.check(mockRequest, 'test@example.com');
      expect(blockedResult.success).toBe(false);
    });
  });

  describe('getAttempts', () => {
    it('returns current attempt count', async () => {
      // Create a fresh rate limiter to avoid conflicts with other tests
      const freshRateLimiter = new RateLimiter({
        windowSize: 60 * 1000,
        maxAttempts: 5
      });
      
      const mockRequest = new Request('http://localhost:3000/test', {
        headers: { 'x-forwarded-for': 'fresh-test-user' }
      });

      expect(freshRateLimiter.getAttempts('fresh-test-user')).toBe(0);

      await freshRateLimiter.check(mockRequest, 'fresh-test-user');
      expect(freshRateLimiter.getAttempts('fresh-test-user')).toBe(1);

      await freshRateLimiter.check(mockRequest, 'fresh-test-user');
      expect(freshRateLimiter.getAttempts('fresh-test-user')).toBe(2);
    });
  });
});