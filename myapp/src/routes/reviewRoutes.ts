import express from 'express';
import { handleAddReview, handleGetReviews } from '../controllers/reviewController';

const router = express.Router();

router.post('/add', handleAddReview);
router.get('/all', handleGetReviews);

export default router;

