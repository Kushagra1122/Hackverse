const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Register user route
router.post('/register', register);

// Login user route
router.post('/login',authMiddleware, login);

module.exports = router;
