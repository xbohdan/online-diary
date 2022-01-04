import classNames from 'classnames';
import React from 'react';
import { IButton } from '../../../types/IButton';

const SecondaryButton = ({
  value,
  className,
  onClick,
  isDisabled,
}: IButton) => {
  return (
    <input
      type="submit"
      className={classNames('secondaryButton', className)}
      value={value}
      disabled={isDisabled}
      onClick={onClick}
    />
  );
};

export default SecondaryButton;
