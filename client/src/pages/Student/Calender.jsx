import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles

const CalendarPage = () => {
  const [classDates, setClassDates] = useState([]);
  const navigate = useNavigate();

  
  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    
  };

 

  return (
    <div className="flex pt-10 justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400  ">
      <div className="p-8 w-full max-w-lg ">
        <h2 className="text-4xl font-semibold text-white mb-8 text-center">
          Select a Date
        </h2>
        <div className="flex justify-center">
          <Calendar
            onClickDay={handleDateClick}
           
            className="react-calendar rounded-xl shadow-lg w-full h-auto"
            style={{ width: "100%", height: "auto", transform: "scale(1.1)" }} // Make the calendar a little bigger
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
