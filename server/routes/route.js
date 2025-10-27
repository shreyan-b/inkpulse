import express from 'express';
import { signupuser, loginUser } from '../controller/user-controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Authentication routes
router.post('/signup', signupuser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json(req.user);
});

export default router;