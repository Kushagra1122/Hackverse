const express = require('express');
const router = express.Router();
const { authMiddleware, prof } = require('../middlewares/authMiddleware');
const { getCourse } = require('../controllers/courseController');



router.get('/getCourse/:id', getCourse);
module.exports = router;
