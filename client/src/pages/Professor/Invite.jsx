import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
const Invite = () => {
  const [students, setStudents] = useState([]);
  const [auth, setAuth] = useAuth(); // Replace with your actual auth token logic

  const func = async () => {
    if (auth?.token !== null) {
      const response = await fetch(
        `http://localhost:8000/api/auth/getStudents`,
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

  useEffect(() => {
    func();
    console.log("HIIII")
  }, [auth]);

  const handleInvite = (studentId) => {
    // Logic to handle the invite (e.g., send invite email or notification)
    console.log(`Inviting student with ID: ${studentId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Invite Students</h2>
      <div className="space-y-4">
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student._id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <span className="text-lg font-medium">{student.name}</span>
              <button
                onClick={() => handleInvite(student._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Invite
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Invite;
