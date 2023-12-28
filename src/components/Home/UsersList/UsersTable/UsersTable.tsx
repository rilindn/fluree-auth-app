'use client'

import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Button from '@/components/Buttons/Button/Button';
import styles from './UsersTable.module.scss';
import { createCredential } from '../../../../../lib/api/ApiMethods';

export default function UsersTable({users}: {users: any}) {
  const { data: session }: {data: any} = useSession()
  const router = useRouter();

  const handleVerify = async (user: any) => {
    console.log("🚀 ~ file: UsersTable.tsx:12 ~ handleVerify ~ user:", user)
    try {
      const issuer = session?.user?.['person:did']?.['@id']
      const userId = user?.['@id']
      console.log("🚀 ~ file: UsersTable.tsx:15 ~ handleVerify ~ issuer:", issuer)
      console.log("🚀 ~ file: UsersTable.tsx:16 ~ handleVerify ~ userId:", userId)
      const vc = await createCredential({issuer, userId})
    } catch (error) {
      throw error
    } finally {
      router.refresh();
    }
  }


  return (
    <table className={styles.main}>
      <thead>
        <tr className='bg-slate-400 border-b text-left'>
          <th className='p-4'>Name</th>
          <th className='p-4'>Email</th>
          <th className='p-4'>Role</th>
          <th className='p-4 text-center'>Email verified</th>
          <th className='p-4 text-center'>Verification</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user.email}>
            <td className='p-4'>{user.name}</td>
            <td className='p-4'>{user.email}</td>
            <td className='p-4'>{user.role}</td>
            <td className='p-4 text-center'>{user.emailVerified ? '✅' : '❌'}</td>
            <td className='text-center'>
              {!user?.['user:cred'] ? 
              <Button onClick={() => handleVerify(user)} title="Verify"></Button>
              :
              '✅'
            }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}