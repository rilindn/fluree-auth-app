'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { updateUser } from "../../../../../lib/api/ApiMethods";


export default function ConfirmEmail({ params }: { params: { code: string } }) {
  const { data: session, update, status } = useSession()
  const [confirmationStatus, setConfirmationStatus] = useState(!!session?.user?.emailVerified ? 'confirmed' : 'unconfirmed');


  useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') {
        return;
      } else if (session?.user?.emailVerified) {
        setConfirmationStatus('confirmed');
      } else if (params.code === session?.user?.verificationCode) {
        await updateUser({ email: session?.user?.email || '', emailVerified: true })
        update()
        setConfirmationStatus('confirmed');
        console.log('confirmationStatus - success')
      } else {
        setConfirmationStatus('error');
        console.error('Email confirmation failed.');
      }
    };

    fetchData();
  }, [status, session, update]);


  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hi {session?.user?.name}</h2><br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You are signed in as {session?.user?.email}.</p>
        <div className="flex gap-x-2">
          {confirmationStatus === 'confirmed' && <h3 className="text-xl">Your email was confirmed!</h3>}
          {confirmationStatus === 'error' && <h3 className="text-xl">There was an issue while confirming your email.</h3>}
          {(confirmationStatus === 'unconfirmed') && <h3 className="text-xl">Confirming your email...</h3>}
        </div>
        <a className="text-sm text-emerald-400" href="/">Go to home</a>
      </div>
    </section>
  )
}