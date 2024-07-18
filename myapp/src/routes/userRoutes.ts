import express from 'express';
import { handleSignUp, handleSignIn } from '../controllers/userController';

const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);

export default router;
