const express = require('express');
const router = express.Router();
const { register, login, session, getStudents } = require('../controllers/authController');
const {authMiddleware,prof} = require('../middlewares/authMiddleware');

// Register user route
router.post('/register', register);

// Login user route
router.post('/login', login);

router.get('/session',authMiddleware, session);
router.get("/getStudents",authMiddleware,prof, getStudents);
module.exports = router;
