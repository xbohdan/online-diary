import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/LargeLogo.png';

import './Header.css';

const Header = () => {
  return (
    <Link to="/">
      <img src={logo} alt="Logo" className="logo" />
    </Link>
  );
};

export default Header;
