import { NextRequest } from 'next/server';

// Simple in-memory rate limiter for demonstration
// In production, you'd want to use Redis or a proper database
const requests = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export function rateLimit(options: RateLimitOptions) {
  const { maxRequests, windowMs } = options;

  return function checkRateLimit(request: NextRequest): { success: boolean; error?: string } {
    const ip = getClientIP(request);
    const now = Date.now();
    
    // Clean up expired entries
    const cutoff = now - windowMs;
    for (const [key, value] of requests.entries()) {
      if (value.resetTime < cutoff) {
        requests.delete(key);
      }
    }
    
    const current = requests.get(ip);
    
    if (!current || current.resetTime < now - windowMs) {
      // First request or window expired
      requests.set(ip, { count: 1, resetTime: now + windowMs });
      return { success: true };
    }
    
    if (current.count >= maxRequests) {
      return { 
        success: false, 
        error: `Too many requests. Please try again in ${Math.ceil((current.resetTime - now) / 1000)} seconds.` 
      };
    }
    
    // Increment count
    current.count++;
    return { success: true };
  };
}

function getClientIP(request: NextRequest): string {
  // Try to get the real IP from headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list, take the first IP
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback for unknown IP
  return 'unknown';
}

// Common rate limit configurations
const isDevelopment = process.env.NODE_ENV === 'development';

export const contactFormRateLimit = rateLimit({
  maxRequests: isDevelopment ? 100 : 5, // More lenient in development
  windowMs: isDevelopment ? 60 * 1000 : 15 * 60 * 1000, // 1 minute in dev, 15 minutes in prod
});

export const newsletterRateLimit = rateLimit({
  maxRequests: isDevelopment ? 100 : 3, // More lenient in development
  windowMs: isDevelopment ? 60 * 1000 : 60 * 60 * 1000, // 1 minute in dev, 1 hour in prod
});