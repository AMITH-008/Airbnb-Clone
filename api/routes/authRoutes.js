import express from 'express';
import { logIn, logout, signUp } from '../controllers/authController.js';


const router = express.Router();

router.post("/register", signUp);
router.post("/login", logIn);
router.post("/logout", logout);

export default router;