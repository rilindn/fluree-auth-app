import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import users from '../../../../../db/users.json'
import { findUser } from '../../../../../lib/api/FlureeMethods';

interface IUser {
  id: string
  name: string
  email: string
  password: string,
  verificationCode: string,
  verifiedEmail: boolean
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "rilind@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials?.email || !credentials.password) return null
        const user = await findUser(credentials.email)

        if (!user) return null
        const verifyCredentials = await bcrypt.compare(credentials?.password, user.password);
  
        // If no error and we have user data, return it
        if (verifyCredentials) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // })
  ],
  callbacks: {
    async jwt({token, user, trigger}) {
      if (trigger === "update") {
        const userData = users.find((user) => user.email === token?.email)
        return { ...token, ...userData }
      }
      return {...token, ...user}
    },
    async session({ session, token }) {
        session.user = token
        return session; // Ensure the correct type for session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };