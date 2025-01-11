const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    class_date: { type: Date, required: true },
    professor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    keywords: [{ type: String }],
    ppt_file: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Class', classSchema);
