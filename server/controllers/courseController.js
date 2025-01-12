const Course = require("../models/course");

exports.getCourse = async (req, res) => {
    try {
        // Get the course ID from the URL parameter
        const courseId = req.params.id;

        // Find the course by its ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Return the course details
        res.status(200).json({ course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
