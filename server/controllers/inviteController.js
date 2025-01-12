const User = require('../models/User');
const Course = require('../models/course');
const Invite = require('../models/invite'); // Import the Invite model

exports.getInvite = async (req, res) => {
    const { id } = req.params; // Extract the student ID or invite ID from the URL parameter

    try {
        // Validate that the ID is in the correct format, if necessary
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        // Find the invite by ID (assuming 'Invite' is the model you're querying)
        const invite = await Invite.find({student_id:id});

        if (!invite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        res.status(200).json({
            message: 'Invite fetched successfully',
            invite,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
// Controller to get all invites
exports.getAllInvites = async (req, res) => {
    try {
        // Fetch all invites from the database
        const invites = await Invite.find();

        // If no invites are found
        if (invites.length === 0) {
            return res.status(404).json({ message: 'No invites found' });
        }

        // Return the invites
        res.status(200).json({
            message: 'All invites fetched successfully',
            invites,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to accept an invite
exports.createInvite = async (req, res) => {
    const { studentId } = req.params; // Extract studentId from URL parameter
    const { course_title } = req.body; // Extract course title from request body
    const prof_id = req.user.userId; // The authenticated professor's ID from the auth middleware
console.log(req.body)
    try {
        // Check if the professor and student exist
        const professor = await User.findById(prof_id);
        const student = await User.findById(studentId);

        if (!professor || professor.role !== 'professor') {
            return res.status(404).json({ message: 'Professor not found or not authorized' });
        }

        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Create a new invite
        const newInvite = new Invite({
            prof_id,
            student_id: student._id,
            course_title,
        });

        // Save the invite to the database
        await newInvite.save();

        res.status(201).json({
            message: 'Invite created successfully',
            invite: newInvite,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.acceptInvite = async (req, res) => {
    try {
        const { inviteId } = req.params; // Get inviteId from the URL parameter

        // Find the invite by ID
        const invite = await Invite.findById(inviteId);

        if (!invite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        // Update the invite status to 'accepted'
        invite.invite_status = 'accepted';
        await invite.save();
        const course = await Course.findOne({ title: invite.course_title }); // Find the course by title

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Append the student ID to the students array
        course.students.push(invite.student_id);
        await course.save();

        res.status(200).json({
            message: 'Student added to course successfully',
            invite,
            course,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to reject an invite
exports.rejectInvite = async (req, res) => {
    try {
        const { inviteId } = req.params; // Get inviteId from the URL parameter

        // Find and delete the invite by ID
        const invite = await Invite.findByIdAndDelete(inviteId);

        if (!invite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        res.status(200).json({
            message: 'Invite rejected and deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
