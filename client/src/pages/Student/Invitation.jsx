import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";

const Invitation = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth(); // Assuming you have auth context for token and user details

  // Fetch invitations from the backend
  const fetchInvitations = async () => {
    if (auth?.user?._id !== undefined) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/invite/get/${auth?.user?._id}`,
          {
            method: "GET", // Ensure the correct method is used
            headers: {
              Authorization: `Bearer ${auth?.token}`, // If using token-based authentication
            },
          }
        );
        const data = await response.json();
        console.log("API Response:", data); // Log the response to check the data
        setInvitations(data.invite); // Ensure that the correct field is used in the response
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Accept an invitation
  const handleAccept = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/invite/accept/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Invitation accepted successfully");
        fetchInvitations(); // Refresh the invitations list
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  // Reject an invitation
  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/invite/reject/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Invitation rejected successfully");
        fetchInvitations(); // Refresh the invitations list
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  // Fetch invitations on component mount
  useEffect(() => {
    fetchInvitations();
  }, [auth]);

  if (loading) {
    return <div>Loading invitations...</div>;
  }

  if (invitations?.length === 0) {
    return <div>No invitations available.</div>;
  }

  return (
    <div className="invitation-list">
      <h2 className="text-2xl font-bold mb-4">Invitations</h2>
      <ul className="space-y-4">
        {invitations?.map((invite) => (
          <li key={invite._id} className="p-4 border rounded shadow-sm">
            <p>
              <strong>Course Title:</strong> {invite.course_title}
            </p>
            <p>
              <strong>Status:</strong> {invite.invite_status}
            </p>
            {invite.invite_status === "pending" && (
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => handleAccept(invite._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(invite._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invitation;
