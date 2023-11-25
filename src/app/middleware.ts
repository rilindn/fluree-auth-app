import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token)
  },
    {
        callbacks: {
            authorized: ({ token }) => {
                if (token) return true // If there is a token, the user is authenticated
                return false
            }
        }
    });

export const config = { matcher: ["/home"] }
