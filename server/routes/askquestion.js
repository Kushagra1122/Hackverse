const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Question=require('../models/Question')

router.post('/ask-question', authMiddleware, async (req, res) => {
    const { questionText, pptId } = req.body;
  
    if (!questionText || !pptId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const newQuestion = new Question({
      questionText,
      user: req.user.userId, // Get the user's ID from the token
      pptId
    });
  
    await newQuestion.save();
    res.status(201).json({ message: 'Question asked successfully', question: newQuestion });
  });