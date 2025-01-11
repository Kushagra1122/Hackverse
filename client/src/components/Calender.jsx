import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ classData }) => {
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    const classInfo = classData.find((item) => {
      const classDate = new Date(item.date);
      return (
        classDate.getFullYear() === date.getFullYear() &&
        classDate.getMonth() === date.getMonth() &&
        classDate.getDate() === date.getDate()
      );
    });

    if (classInfo) {
      navigate('/class-details', { state: { date, classInfo } });
    } else {
      alert(`No class scheduled for ${date.toDateString()}`);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const classInfo = classData.find((item) => {
        const classDate = new Date(item.date);
        return (
          classDate.getFullYear() === date.getFullYear() &&
          classDate.getMonth() === date.getMonth() &&
          classDate.getDate() === date.getDate()
        );
      });
      if (classInfo) {
        return (
          <button
            style={{
              marginTop: '5px',
              background: '#FFDD57',
              padding: '2px 4px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => handleDateClick(date)}
          >
            {classInfo.topic}
          </button>
        );
      }
    }
    return null;
  };

  return (
    <Calendar onChange={setValue} value={value} tileContent={tileContent} />
  );
};

export default CalendarComponent;
