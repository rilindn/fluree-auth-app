'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import TextInput from '../../Inputs/TextInput/TextInput';
import styles from './LoginForm.module.scss';
import Button from '../../Buttons/Button/Button';
import { signIn } from 'next-auth/react';

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

interface LoginFormProps {
  className?: string
}

const LoginForm = ({ className }: LoginFormProps) => {
    const {
      handleSubmit,
      reset,
      control,
    } = useForm<LoginFormData>({resolver: yupResolver(schema),});
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<LoginFormData> = async (data: any) => {
      setLoading(true);
      try {    
        await signIn('credentials', {...data, callbackUrl: window.location.origin});
      } finally {
        setLoading(false);          
      }
    };

    return (
      <div className={classNames(styles.main, className)}>
        <div className={styles.form}>
          <TextInput
            control={control}
            name="email"
            className={styles.textInput}
            label="Email"
            placeholder="Enter email"
          />
          <TextInput
            control={control}
            name="password"
            className={styles.textInput}
            label="Password"
            placeholder="Enter password"
          />
        </div>
        <Button onClick={handleSubmit(onSubmit)} primary loading={loading} title='Login'/>
      </div>
    );
}


export default LoginForm;
