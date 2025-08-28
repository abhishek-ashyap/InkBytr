import express from 'express';
import { 
  registerUser, 
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail, // ✅ Import new function
} from '../controllers/authController.js';
import { apiLimiter, failedLoginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', apiLimiter, registerUser);
router.post('/login', failedLoginLimiter, loginUser);

// ✅ ADD NEW ROUTE for email verification
router.get('/verify-email/:token', verifyEmail);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
