import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized({ req, token }) {
                if (token) return true // If there is a token, the user is authenticated
            }
        }
    });

export const config = { matcher: ["/auth/register"] }