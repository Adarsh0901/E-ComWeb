import express from 'express';
import { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview } from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router = express.Router()



// Fetch All Products in localhost:4000/api/products
router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect, createProductReview)

// Fetch Particular product whose id will match
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)

export default router