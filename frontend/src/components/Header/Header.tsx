import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RedButton from '../$buttons/RedButton/RedButton';
import useAppDispatch from '../../hooks/useAppDispatch';
import logo from '../../static/LargeLogo.png';

import './Header.css';
import { logout } from '../../store/user/slice';
import Container from '../Container/Container';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="header">
      <Container className="flex justify-between align-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <RedButton
          value="Log Out"
          className="logoutButton"
          onClick={logoutUser}
        />
      </Container>
    </div>
  );
};

export default Header;
