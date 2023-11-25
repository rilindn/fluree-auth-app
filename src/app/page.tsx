import { getServerSession } from "next-auth";
import { useSession, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'

import { authOptions } from "./api/auth/[...nextauth]/route";
import Button from "./../../components/Buttons/Button/Button";
import SignOutButton from "./../../components/Buttons/SignOutButton/SignOutButton";
import { fetchFluree, sendEmail } from "./../../lib/api/ApiMethods";
import ConfirmEmailDialog from "./../../components/Home/ConfirmEmailDialog/ConfirmEmailDialog";


export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }
  
  if (!session?.user?.emailVerified) {
    return <ConfirmEmailDialog/>
  }


  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hi {session?.user?.name}</h2><br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You are signed in as {session?.user?.email}.</p>
        <div className="flex gap-x-2">
          <SignOutButton />
        </div>
      </div>
    </section>
  );
}