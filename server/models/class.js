const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  classId: {
    type: String,
    unique: true,
    required: true,
  },
  resourceUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Class', classSchema);
