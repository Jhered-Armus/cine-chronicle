// routes/libraryRoutes.js
const express = require('express');
const router = express.Router();
const {addOrUpdateLibrary, getLibraryByUser} = require('../controllers/LibraryController');

router.post('/library', addOrUpdateLibrary);
router.get('/library/:userId', getLibraryByUser);

module.exports = router;