'use client'

import React from 'react'
import Button from '../Button/Button'
import { signOut } from 'next-auth/react'

import styles from './SignOutButton.module.scss';

const SignOutButton = () => {
  return (
    <Button className={styles.main} onClick={() => signOut()} title="Sign Out"></Button>
  )
}

export default SignOutButton