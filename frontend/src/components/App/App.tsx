import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Note from '../Note/Note';
import NotesCalendar from '../NotesCalendar/NotesCalendar';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<NotesCalendar />} />
        <Route path="/note" element={<Note />} />
      </Routes>
    </Router>
  );
};

export default App;
