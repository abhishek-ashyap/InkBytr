import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const rateLimit = require('express-rate-limit');

// Limiter for registration - now set to 20 requests per minute
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // ✅ CHANGED: Allow max 20 registration requests per minute
  message: { error: 'Too many registration attempts, please try again later.' },
});

// Limiter for failed login attempts - now set to 10 attempts per 15 minutes
export const failedLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // ✅ CHANGED: Allow max 10 failed attempts before locking out
  message: {
    error: 'Too many failed login attempts. Please try again after 15 minutes.',
  },
  keyGenerator: (req) => req.ip + (req.body?.email || ''),
  skipSuccessfulRequests: true, // Critical: don't count successful logins
});
