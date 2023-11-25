
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';

import { authOptions } from "./api/auth/[...nextauth]/route";
import { NextAuthProvider } from './context/NextAuthProvider';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Thought Bank',
  description: 'Powered by Thought Bank',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
