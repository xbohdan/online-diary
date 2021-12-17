import React from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

import 'react-calendar/dist/Calendar.css';
import './NotesCalendar.css';

const NotesCalendar = () => {
  const navigate = useNavigate();

  const redirectToNote = () => {
    const path = '/note';
    navigate(path);
  };

  return (
    <div className="calendar-container">
      <Calendar className="calendar" onClickDay={redirectToNote} />
    </div>
  );
};

export default NotesCalendar;
