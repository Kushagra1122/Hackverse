import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Queries",
      description: "Submit or view your queries.",
      icon: "❓",
      action: () => navigate("/invitation"),
    },
    {
      title: "Calendar",
      description: "View your class schedule and important dates.",
      icon: "📅",
      action: () => navigate("/calendar"), // Navigate to the /calendar route
    },
    {
      title: "Invitation",
      description: "Check for event or class invitations.",
      icon: "✉️",
      action: () => navigate("/invitation"),
    },
    {
      title: "My Profile",
      description: "View and edit your profile information.",
      icon: "👤",
      action: () => alert("Opening Profile..."),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 p-8">
      <h1 className="text-4xl font-bold text-white mt-10 text-center mb-12">
        Student Dashboard
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

export default StudentDashboard;
