import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { comparePassword, hashPassword } from '../utils/hash.js';
import { sendEmail } from '../utils/email.js';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '7d',
    }
  );
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: 'User already exists' });

    const hashed = await hashPassword(password);
    const user = await User.create({ email, password: hashed });

    const verificationToken = user.createVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationURL = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    const htmlMessage = `<p>Welcome to Inkbytr! Please click the link below to verify your email address:</p><a href="${verificationURL}">Verify Email</a>`;
    
    await sendEmail(user.email, 'Verify Your Email Address', 'Please verify your email.', htmlMessage);

    res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    const passwordMatch = user ? await comparePassword(password, user.password) : false;

    if (!user || !passwordMatch)
      return res.status(401).json({ error: 'Invalid credentials' });

    if (!user.isVerified) {
        return res.status(403).json({ error: 'Please verify your email address before logging in.' });
    }

    const token = generateToken(user);
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const verifyEmail = async (req, res) => {
    try {
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            verificationToken: hashedToken,
            verificationExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token is invalid or has expired.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        await user.save();

        const loginToken = generateToken(user);
        res.status(200).json({ message: 'Email verified successfully.', token: loginToken });
    } catch (err) {
        console.error("Email Verification Error:", err);
        res.status(500).json({ error: 'Failed to verify email.' });
    }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const htmlMessage = `<p>Forgot your password? Click the link below to reset it.</p><a href="${resetURL}">Reset Password</a><p>This link is valid for 10 minutes.</p>`;

    await sendEmail(user.email, 'Your Password Reset Token (Valid for 10 min)', `Reset your password here: ${resetURL}`, htmlMessage);

    res.status(200).json({ message: 'Password reset link has been sent to your email.' });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ error: 'There was an error sending the email. Please try again later.' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token is invalid or has expired' });
    }

    user.password = await hashPassword(req.body.password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const loginToken = generateToken(user);
    res.status(200).json({ message: 'Password reset successful', token: loginToken });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};
