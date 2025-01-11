const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    fileUrl: { type: String, required: true },
    profId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

module.exports = FileUpload;
