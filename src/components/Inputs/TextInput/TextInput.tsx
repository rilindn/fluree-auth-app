import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import styles from './TextInput.module.scss';

export interface TextInputProps {
  name: string;
  defaultValue?: string;
  control?: any;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: FieldError | undefined;
  className?: string;
}

function TextInput({  
  name,
  defaultValue = '',
  control,
  value = '',
  onChange,
  label,
  className,
  type = 'text',
  placeholder,
  onInput,
  disabled,
  error,
  ...rest 
}: TextInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => (
        <div className={classNames(styles.inputWrapper, className, { [styles.errorSpace]: control || disabled })}>
          <TextField
            value={value}
            onChange={onChange}
            color="primary"
            variant="outlined"
            type={type}
            label={label}
            placeholder={placeholder || label || ''}
            size="small"
            margin="none"
            onInput={onInput}
            disabled={disabled}
            {...rest}
          />
          {!!error?.message && <span className={styles.error}>{error.message}</span>}
        </div>
      )}
    />
  );
}

export default TextInput;
