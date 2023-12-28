import React from 'react';
import classNames from 'classnames';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

import styles from './Button.module.scss';

interface ButtonProps extends Omit<LoadingButtonProps, 'children'> {
  title?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  maxWidth?: number;
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title = 'Submit',
  loading,
  className,
  onClick,
  maxWidth,
  primary,
  variant,
  ...rest
}) => {
  return (
    <div className={classNames(styles.main, className)} style={{ maxWidth }}>
      <LoadingButton
        variant={variant}
        className={classNames(
          { [styles.primary]: primary },
          { [styles.dimmed]: variant === 'outlined' }
        )}
        loading={loading}
        onClick={onClick}
        {...rest}
      >
        {title}
      </LoadingButton>
    </div>
  );
};

export default Button;
