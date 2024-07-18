// reviewController.ts
import { Request, Response } from 'express';
import { addReview, getReviews, Review } from '../models/reviewModel';

export const handleAddReview = (req: Request, res: Response) => {
    console.log('Received add review request');
    const { username, productId, rating, comment } = req.body;
    const newReview: Review = { username, productId, rating: Number(rating), comment, date: new Date() };

    addReview(newReview);
    res.send('Review submitted successfully!');
};

export const handleGetReviews = (req: Request, res: Response) => {
    console.log('Received get reviews request');
    const reviews = getReviews();
    res.json(reviews);
};
