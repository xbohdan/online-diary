import classNames from 'classnames';
import React from 'react';

import './Container.css';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IProps) => {
  return <div className={classNames('container', className)}>{children}</div>;
};

export default Container;
