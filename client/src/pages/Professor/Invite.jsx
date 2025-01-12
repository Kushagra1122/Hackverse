import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";

const Invite = () => {
  const [students, setStudents] = useState([]);
  const [auth, setAuth] = useAuth(); // Assuming you have auth context
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle error state
  const [success, setSuccess] = useState(""); // To handle success message
  const [invites, setInvites] = useState([]);
let courseTitle
  // Fetch students
  const func = async () => {
    if (auth?.token !== null) {
      const response = await fetch(
        `http://localhost:3000/api/auth/getStudents`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
        setStudents(res.students);
      } else {
        console.error("Error fetching students:", res.message);
      }
    }
  };

  // Fetch all invites
  const func2 = async () => {
    if (auth?.token !== null) {
      const response = await fetch(`http://localhost:3000/api/invite/getall`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const res = await response.json();
      if (response.ok) {
        setInvites(res.invites); // Set invites to state
      } else {
        console.error("Error fetching invites:", res.message);
      }
    }
  };

  useEffect(() => {
    func();
    func2(); // Fetch invites when the component mounts
  }, [auth]);

  const handleInvite = async (studentId) => {
    setLoading(true);
    setError("");
    setSuccess("");

    // Ensure the course ID is available from auth context
    const courseId = auth?.user?.course;

    if (!courseId) {
      setError("Course ID is not available.");
      setLoading(false);
      return;
    }

    try {
      // Fetch the course details using the course ID
      const courseResponse = await fetch(
        `http://localhost:3000/api/course/getCourse/${courseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      const courseData = await courseResponse.json();

      if (!courseResponse.ok) {
        setError(courseData.message || "Failed to fetch course details.");
        setLoading(false);
        return;
      }

       courseTitle = courseData.course.title; // Assuming the course title is in courseData.course.title

      // Send the invite with the course title
      const inviteResponse = await fetch(
        `http://localhost:3000/api/invite/create/${studentId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_title: courseTitle, // Use the fetched course title
          }),
        }
      );

      const res = await inviteResponse.json();

      if (inviteResponse.ok) {
        setSuccess("Invite sent successfully!");
        func2(); // Refresh invites list after sending an invite
      } else {
        setError(res.message || "Failed to send invite");
      }
    } catch (err) {
      setError("An error occurred while sending the invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen flex justify-center py-12 px-6">
      <div className="max-w-3xl w-full p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Invite Students
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <div className="space-y-6">
          {students.length > 0 ? (
            students.map((student) => {
              // Check if the student has already been invited for the course
              const isInvited = invites.some((invite) => {
              
                if (invite.prof_id ===auth.user._id) {
                  
                  return (
                    invite.student_id.toString() === student._id.toString()
                  );
                }
                return false; // If the course_title doesn't match, return false
              });

              console.log(isInvited);
              

              return (
                <div
                  key={student._id}
                  className="flex justify-between items-center p-4 border bg-white border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-medium text-gray-800">
                      {student.name}
                    </span>
                  </div>
                  {!isInvited ? (
                    <button
                      onClick={() => handleInvite(student._id)}
                      className={`${
                        loading ? "bg-gray-400" : "bg-blue-500"
                      } text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200`}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Invite"}
                    </button>
                  ) : (
                    <span className="text-green-500 font-semibold">
                      Invite Sent
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invite;
