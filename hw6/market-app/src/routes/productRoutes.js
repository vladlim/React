import express from 'express';
import { authenticateJWT } from '../auth/jwtMiddleware';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

router.post('/', authenticateJWT, createProduct);
router.get('/', authenticateJWT, getProducts);
router.get('/:id', authenticateJWT, getProductById);
router.put('/:id', authenticateJWT, updateProduct);
router.delete('/:id', authenticateJWT, deleteProduct);

export default router;