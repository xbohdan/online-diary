import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <input
          type="button"
          className="redButton logoutButton"
          value="Log out"
          onClick={logoutUser}
        />
      </Container>
    </div>
  );
};

export default Header;
