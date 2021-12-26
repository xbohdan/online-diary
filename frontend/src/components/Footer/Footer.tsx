import React from 'react';

import './Footer.css';
import Container from '../Container/Container';

const Footer = () => {
  return (
    <div className="footer">
      <Container className="flex justify-between align-center">
        <p>© Web Application Programming, 2021-2022</p>
        <p>Bohdan Soproniuk & Akmalkhon Mukhiddinov</p>
      </Container>
    </div>
  );
};

export default Footer;
