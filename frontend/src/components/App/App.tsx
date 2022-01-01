import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoginPage from '../$auth/LoginPage/LoginPage';
import RegistrationPage from '../$auth/RegistrationPage/RegistrationPage';
import Note from '../$note/Note/Note';
import useAppSelector from '../../hooks/useAppSelector';
import selectIsAuth from '../../store/user/selectors/selectIsAuth';
import NotesCalendar from '../NotesCalendar/NotesCalendar';

const App = () => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </HashRouter>
    );
  }

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
