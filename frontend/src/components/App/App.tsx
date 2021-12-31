import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Note from '../$note/Note/Note';
import NotesCalendar from '../NotesCalendar/NotesCalendar';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<NotesCalendar />} />
        <Route path="/note/:date" element={<Note />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
