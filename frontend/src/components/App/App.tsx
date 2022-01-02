import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../$auth/LoginPage/LoginPage';
import RegistrationPage from '../$auth/RegistrationPage/RegistrationPage';
import Note from '../$note/Note/Note';
import isValidToken from '../../helpers/isValidToken';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { selectExpiration } from '../../store/user/selectors';
import selectIsAuth from '../../store/user/selectors/selectIsAuth';
import { logout } from '../../store/user/slice';
import NotesCalendar from '../NotesCalendar/NotesCalendar';

const App = () => {
  const isAuth = useAppSelector(selectIsAuth);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const expiration = useAppSelector(selectExpiration);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof expiration === 'string' && !isValidToken(expiration as string)) {
      dispatch(logout());
      navigate('/');
    }
  }, [location, dispatch, expiration, navigate]);

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<NotesCalendar />} />
      <Route path="/note/:date" element={<Note />} />
    </Routes>
  );
};

export default App;
