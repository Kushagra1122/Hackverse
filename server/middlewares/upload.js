// middlewares/upload.js
const multer = require('multer');

// Set up storage options for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify where to store the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
