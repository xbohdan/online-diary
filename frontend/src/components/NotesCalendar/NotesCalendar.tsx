import React from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './NotesCalendar.css';

const NotesCalendar = () => {
  return (
    <div className="calendar-container">
      <Calendar className="calendar" />
    </div>
  );
};

export default NotesCalendar;
