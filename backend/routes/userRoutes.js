import express from 'express';
const router = express.Router()
import { authUser, registerUser,getUserProfile,updateUserProfile, getUsers, deleteUsers, getUserById,updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect,getUsers)
// Fetch All Products in localhost:4000/api/products
router.post('/login', authUser)
router.route('/profile').get( protect , getUserProfile).put( protect, admin, updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUsers).get(protect,admin,getUserById).put(protect,admin,updateUser)

export default router