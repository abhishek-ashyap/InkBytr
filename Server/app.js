import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // ✅ Import helmet
import connectDB from './config/config.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(helmet()); // ✅ ADD THIS LINE for security headers
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running 🚀' });
});

export default app;
