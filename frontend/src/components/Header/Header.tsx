import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/LargeLogo.png';

import './Header.css';
import Container from '../Container/Container';

const Header = () => {
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
        />
      </Container>
    </div>
  );
};

export default Header;
