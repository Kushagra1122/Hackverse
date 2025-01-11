const cloudinary = require('../configs/cloudinaryConfig');
const FileUpload = require('../models/pdf'); // Ensure the correct path to your model

// Controller to handle file upload
exports.uploadpdf = async (req, res) => {
    try {
        const { title, date, profId } = req.body;

        // Check if all required fields are present
        if (!title || !date || !profId || !req.file) {
            return res.status(400).json({ message: 'Missing required fields or file.' });
        }

        // Upload the file to Cloudinary
        cloudinary.uploader.upload(req.file.path, { resource_type: 'raw' }, async (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Failed to upload file to Cloudinary.' });
            }

            const fileUrl = result.secure_url; // Cloudinary URL of the uploaded file

            // Create a new file upload document
            const newFile = new FileUpload({
                title,
                date,
                fileUrl,
                profId,
            });

            // Save the file information to the database
            await newFile.save();

            // Send response with file URL
            res.status(200).json({
                message: 'File uploaded successfully!',
                fileUrl,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload file.' });
    }
};
