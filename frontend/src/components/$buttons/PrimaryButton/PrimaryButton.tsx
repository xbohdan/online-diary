import classNames from 'classnames';
import React from 'react';
import { IButton } from '../../../types/IButton';

const PrimaryButton = ({ value, className, isDisabled, onClick }: IButton) => {
  return (
    <input
      type="submit"
      className={classNames('primaryButton', className)}
      value={value}
      disabled={isDisabled}
      onClick={onClick}
    />
  );
};

export default PrimaryButton;
