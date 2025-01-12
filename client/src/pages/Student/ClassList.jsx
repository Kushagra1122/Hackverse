import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ClassListPage = () => {
  const [classes, setClasses] = useState([]);
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const navigate = useNavigate();

  useEffect(() => {
    if (!date) {
      navigate('/'); // Redirect if no date parameter
      return;
    }

    fetch(`http://localhost:3000/api/classes?date=${date}`)
      .then((res) => res.json())
      .then((data) => {setClasses(data);console.log(data); })
      .catch((err) => {

        console.error('Failed to fetch classes', err);
        setClasses([]); // Optionally set classes to an empty array if the request fails
      });
  }, [date, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Classes on {date}</h2>
      {classes.length > 0 ? (
        <ul>
          {classes.map((cls) => (
            <li key={cls.classId} className="mb-2">
              <h3 className="font-semibold">{cls.title}</h3>
              <a href={cls.resourceUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                View Resources
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No classes scheduled for this date.</p>
      )}
    </div>
  );
};

export default ClassListPage;
