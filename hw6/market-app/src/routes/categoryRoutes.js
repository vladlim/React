import express from 'express';
import { authenticateJWT } from '../auth/jwtMiddleware';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const router = express.Router();

router.post('/', authenticateJWT, createCategory);
router.get('/', authenticateJWT, getCategories);
router.get('/:id', authenticateJWT, getCategoryById);
router.put('/:id', authenticateJWT, updateCategory);
router.delete('/:id', authenticateJWT, deleteCategory);

export default router;