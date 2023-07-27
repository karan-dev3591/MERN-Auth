import express from "express";
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router();

//Add the endpoint routes only
router.post('/', registerUser )
router.post('/auth' , authUser) //routing method
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile) //unique Id using JWT Authentication

export default router;