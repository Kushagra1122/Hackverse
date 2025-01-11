import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles

const CalendarPage = () => {
  const [classDates, setClassDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/classes/dates')
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log the data to verify it's correct
        const dates = data.map((cls) => {
          const parsedDate = new Date(cls.date); // Parse the date
          // Check if the parsed date is valid
          if (isNaN(parsedDate)) {
            console.error(`Invalid date value: ${cls.date}`);
            return null; // Return null for invalid dates
          }
          return parsedDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        }).filter((date) => date !== null); // Filter out any invalid dates
  
        setClassDates(dates);
      })
      .catch((err) => console.error('Failed to fetch class dates', err));
  }, []);

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    navigate(`/class-list?date=${formattedDate}`); // Navigate to the class list page
  };

  const tileClassName = ({ date, view }) => {
    const formattedDate = date.toISOString().split('T')[0];
    if (view === 'month' && classDates.includes(formattedDate)) {
      return 'bg-blue-500 text-white rounded-full'; // Highlight dates with classes
    }
    return null;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Select a Date</h2>
      <Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />
    </div>
  );
};

export default CalendarPage;
