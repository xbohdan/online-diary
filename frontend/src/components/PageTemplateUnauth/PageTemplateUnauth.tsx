import React from 'react';
import classNames from 'classnames';
import Footer from '../Footer/Footer';
import logo from '../../static/LargeLogo.png';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageTemplateUnauth = ({ children, className }: Props) => {
  return (
    <section className="page">
      <img src={logo} alt="Logo" className="logo" />
      <main className={classNames('page__content', className)}>{children}</main>
      <Footer />
    </section>
  );
};

export default PageTemplateUnauth;
