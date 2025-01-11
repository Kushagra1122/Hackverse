import React from "react";
import { useNavigate } from "react-router-dom";

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const options = [
    {
      title: "Start Class",
      description: "Begin a live class session.",
      icon: "📚",
      action: () => alert("Starting a class..."),
    },
    {
      title: "Upload",
      description: "Upload course materials or assignments.",
      icon: "📤",
      action: () => navigate("/upload"),
    },
    {
      title: "Invite",
      description: "Send invites to students or collaborators.",
      icon: "✉️",
      action: () => alert("Sending invites..."),
    },
    {
      title: "My Profile",
      description: "View and edit your profile information.",
      icon: "👤",
      action: () => alert("Opening profile..."),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 p-8">
      <h1 className="text-4xl font-bold text-white mt-10 text-center mb-12">
        Professor Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={option.action}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="text-5xl mb-4 text-center">{option.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {option.title}
            </h2>
            <p className="text-gray-600 text-center mt-2">
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
