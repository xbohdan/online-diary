import classNames from 'classnames';
import React from 'react';
import { IButton } from '../../../types/IButton';

const RedButton = ({ value, className, onClick, isDisabled }: IButton) => {
  return (
    <input
      type="submit"
      className={classNames('redButton', className)}
      value={value}
      disabled={isDisabled}
      onClick={onClick}
    />
  );
};

export default RedButton;
