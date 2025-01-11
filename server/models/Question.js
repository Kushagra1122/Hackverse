const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pptId: { type: mongoose.Schema.Types.ObjectId, ref: 'PPT', required: true },
    answered: { type: Boolean, default: false },
    answerText: { type: String, default: '' }
  });

  module.exports = mongoose.model('Question', questionSchema);
