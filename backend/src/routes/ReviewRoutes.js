const express = require('express');
const router = express.Router();
const { saveOrUpdateReview, getReview } = require('../controllers/ReviewControlles');

// Ruta para crear o actualizar una reseña
router.post('/', saveOrUpdateReview);

// Ruta para obtener una reseña
router.get('/:userId/:itemId/:episode', getReview);

module.exports = router;
