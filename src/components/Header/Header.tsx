'use client'

import { useSession } from 'next-auth/react';

import SignOutButton from '../Buttons/SignOutButton/SignOutButton';

const Header = () => {
  const { data: session } = useSession()

    return (
      <div className='flex w-full justify-between px-10 py-4 dark:bg-gray-800'>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hi {session?.user?.name}</h2>
        <div className='flex'>
          <SignOutButton />
        </div>
      </div>
    );
}

export default Header;
