// Simple in-memory rate limiter for development
// In production, use Redis or Upstash for distributed rate limiting

const attempts = new Map();
const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5; // Maximum attempts per window

export class RateLimiter {
  constructor(options = {}) {
    this.windowSize = options.windowSize || WINDOW_SIZE;
    this.maxAttempts = options.maxAttempts || MAX_ATTEMPTS;
  }

  // Get identifier from request
  getIdentifier(request) {
    // Try to get IP from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const real = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || real || 'unknown';
    
    // You can also combine with user agent or other identifiers
    return ip;
  }

  // Check if request should be rate limited
  async check(request, identifier = null) {
    const id = identifier || this.getIdentifier(request);
    const now = Date.now();
    
    // Clean up old entries
    this.cleanup();
    
    // Get or create attempt record
    let record = attempts.get(id);
    if (!record) {
      record = {
        count: 0,
        firstAttempt: now,
        lastAttempt: now
      };
      attempts.set(id, record);
    }
    
    // Check if window has expired
    if (now - record.firstAttempt > this.windowSize) {
      // Reset the window
      record.count = 0;
      record.firstAttempt = now;
    }
    
    // Increment attempt count
    record.count++;
    record.lastAttempt = now;
    
    // Check if limit exceeded
    if (record.count > this.maxAttempts) {
      const retryAfter = Math.ceil((record.firstAttempt + this.windowSize - now) / 1000);
      return {
        success: false,
        limit: this.maxAttempts,
        remaining: 0,
        reset: new Date(record.firstAttempt + this.windowSize),
        retryAfter
      };
    }
    
    return {
      success: true,
      limit: this.maxAttempts,
      remaining: this.maxAttempts - record.count,
      reset: new Date(record.firstAttempt + this.windowSize),
      retryAfter: 0
    };
  }

  // Clean up old entries to prevent memory leak
  cleanup() {
    const now = Date.now();
    for (const [id, record] of attempts.entries()) {
      if (now - record.lastAttempt > this.windowSize) {
        attempts.delete(id);
      }
    }
  }

  // Reset attempts for a specific identifier
  reset(identifier) {
    attempts.delete(identifier);
  }

  // Get current attempt count for identifier
  getAttempts(identifier) {
    const record = attempts.get(identifier);
    if (!record) return 0;
    
    const now = Date.now();
    if (now - record.firstAttempt > this.windowSize) {
      return 0;
    }
    
    return record.count;
  }
}

// Create rate limiters for different endpoints
export const authRateLimiter = new RateLimiter({
  windowSize: 15 * 60 * 1000, // 15 minutes
  maxAttempts: 5 // 5 attempts per 15 minutes
});

export const apiRateLimiter = new RateLimiter({
  windowSize: 60 * 1000, // 1 minute
  maxAttempts: 60 // 60 requests per minute
});

// Middleware function for rate limiting
export async function rateLimitMiddleware(request, limiter = apiRateLimiter) {
  const result = await limiter.check(request);
  
  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        message: `Rate limit exceeded. Please try again in ${result.retryAfter} seconds.`,
        retryAfter: result.retryAfter
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.reset.toISOString(),
          'Retry-After': result.retryAfter.toString()
        }
      }
    );
  }
  
  // Add rate limit headers to successful responses
  return null;
}