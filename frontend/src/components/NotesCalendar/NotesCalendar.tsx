import React from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

import 'react-calendar/dist/Calendar.css';
import './NotesCalendar.css';
import dateToString from '../../helpers/dateToString';

const NotesCalendar = () => {
  const navigate = useNavigate();

  const redirectToNote = (date: Date) => {
    const path = `/note/${dateToString(date)}`;
    navigate(path);
  };

  return (
    <div className="calendar-container">
      <Calendar className="calendar" onClickDay={redirectToNote} />
    </div>
  );
};

export default NotesCalendar;
