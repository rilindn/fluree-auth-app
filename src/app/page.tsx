import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

import { authOptions } from "./api/auth/[...nextauth]/route";
import ConfirmEmailDialog from "../components/Home/ConfirmEmailDialog/ConfirmEmailDialog";
import UsersList from "../components/Home/UsersList/UsersList";


export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  if (!session?.user?.emailVerified) {
    return <ConfirmEmailDialog />
  }


  return (
    <section className="flex flex-col items-center">
      <div className="w-3/4 my-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You are signed in as <b>{session?.user?.email}</b>.</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Role: <b>{session?.user?.role}</b>.</p>
      </div>
      {session?.user?.role === 'Admin' &&
        <div className="w-3/4 my-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <UsersList />
        </div>
      }
    </section>
  );
}