const express = require('express');
const { acceptInvite, rejectInvite, createInvite, getAllInvites, getInvite } = require('../controllers/inviteController');
const { authMiddleware, prof } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create/:studentId', authMiddleware,prof,createInvite);

// Route to accept an invite
router.patch('/accept/:inviteId', acceptInvite);
router.get('/getall/', getAllInvites);
router.get('/get/:id', getInvite);

// Route to reject an invite
router.patch('/reject/:inviteId', rejectInvite);

module.exports = router;