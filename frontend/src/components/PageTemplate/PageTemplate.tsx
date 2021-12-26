import React from 'react';
import classNames from 'classnames';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './PageTemplate.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageTemplate = ({ children, className }: Props) => {
  return (
    <section className="page">
      <Header />
      <main className={classNames('page__content', className)}>{children}</main>
      <Footer />
    </section>
  );
};

export default PageTemplate;
