// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();

//NOTE: /api/auth/login: The route used to perform login with Auth0.
//NOTE: /api/auth/logout: The route used to log the user out.
//NOTE: /api/auth/callback: The route Auth0 will redirect the user to after a successful login.
//NOTE: /api/auth/me: The route to fetch the user profile from.
