const express = require('express');
const router = express.Router();
const { uploadpdf } = require('../controllers/pdfController');
const upload = require('../middlewares/upload'); // your multer setup

// POST route to handle file upload
router.post('/upload', upload.single('file'), uploadpdf);

module.exports = router;
