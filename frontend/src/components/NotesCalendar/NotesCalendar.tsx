import React from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

import 'react-calendar/dist/Calendar.css';
import './NotesCalendar.css';
import dateToString from '../../helpers/dateToString';
import Container from '../Container/Container';
import PageTemplate from '../PageTemplate/PageTemplate';

const NotesCalendar = () => {
  const navigate = useNavigate();

  const redirectToNote = (date: Date) => {
    const path = `/note/${dateToString(date)}`;
    navigate(path);
  };

  return (
    <PageTemplate>
      <Container>
        <Calendar className="calendar" onClickDay={redirectToNote} />
      </Container>
    </PageTemplate>
  );
};

export default NotesCalendar;
