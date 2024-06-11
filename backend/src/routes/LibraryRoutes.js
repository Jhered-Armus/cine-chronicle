// routes/libraryRoutes.js
const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/LibraryController');

router.post('/library', libraryController.addOrUpdateLibrary);
router.get('/library/:userId', libraryController.getLibraryByUser);

module.exports = router;