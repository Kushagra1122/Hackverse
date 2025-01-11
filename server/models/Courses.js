const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String, // Corrected from 'string' to 'String'
        required: true,
    },
    prof_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Corrected 'user' to 'User' (it should be a string)
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Corrected 'user' to 'User' (it should be a string)
        },
    ],
});

module.exports = mongoose.model('Course', CourseSchema); // Corrected model name to singular 'Course'
