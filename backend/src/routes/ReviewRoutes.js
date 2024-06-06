const express = require('express');
const router = express.Router();
const Review = require('../models/Review')

//obtener reseñas
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

//crear una reseña
router.post('/', async (req, res) => {
    const review = new Review({
        title: req.body.title,
        body: req.body.body,
        rating: req.body.rating
    });
    try {
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
