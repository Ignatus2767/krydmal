"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetReviews = exports.handleAddReview = void 0;
const reviewModel_1 = require("../models/reviewModel");
const handleAddReview = (req, res) => {
    console.log('Received add review request');
    const { username, productId, rating, comment } = req.body;
    const newReview = { username, productId, rating: Number(rating), comment, date: new Date() };
    (0, reviewModel_1.addReview)(newReview);
    res.send('Review submitted successfully!');
};
exports.handleAddReview = handleAddReview;
const handleGetReviews = (req, res) => {
    console.log('Received get reviews request');
    const reviews = (0, reviewModel_1.getReviews)();
    res.json(reviews);
};
exports.handleGetReviews = handleGetReviews;
