'use client'

import React from 'react'
import { sendEmail } from '../../../lib/api/ApiMethods';
import { useSession } from 'next-auth/react';


export default function ConfirmEmailDialog() {
  const { data: session } = useSession()


  const handleSendEmail = async () => {
    try {
      await sendEmail({
        recipientEmail: session?.user?.email,
        verificationCode: session?.user?.verificationCode,
        locationOrigin: window.location.origin
      })
    } finally {
      // onCancel();
    }
  };


  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2>Please check your email inbox to confirm your email.</h2>
        <p className="text-xs">
          If you didnt receive the email, click
          <button className='text-emerald-400' onClick={handleSendEmail}>&nbsp;here </button> to resend it!
        </p>
      </div>
    </section>
  )
}