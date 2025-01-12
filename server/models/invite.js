const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    prof_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming the professor is a user in the 'User' model
    },
    course_title: {
        type: String,
        required: true,
    },
    invite_status: {
        type: String,
        enum: ['pending', 'sent', 'accepted', 'rejected'],
        default: 'pending',
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming the professor is a user in the 'User' model
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Invite', inviteSchema);
