import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  deleteComment,
  getUserPosts,
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ FINAL FIX: The order of routes has been corrected.
// Specific routes like '/myposts' must come BEFORE dynamic routes like '/:id'.

// Public Routes
router.get('/', getAllPosts);

// Protected Routes (Specific before Dynamic)
router.get('/myposts', verifyToken, getUserPosts); 

// Public Dynamic Route (This must be after '/myposts')
router.get('/:id', getPostById);

// Other Protected Routes
router.post('/', verifyToken, createPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);
router.post('/:id/like', verifyToken, likePost);
router.post('/:id/unlike', verifyToken, unlikePost);

// Comment Routes
router.post('/:id/comments', verifyToken, createComment);
router.delete('/:id/comments/:commentId', verifyToken, deleteComment);

export default router;
