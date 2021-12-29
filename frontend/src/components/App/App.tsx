import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Note from '../$note/Note/Note';
import NotesCalendar from '../NotesCalendar/NotesCalendar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesCalendar />} />
        <Route path="/note/:date" element={<Note />} />
      </Routes>
    </Router>
  );
};

export default App;
