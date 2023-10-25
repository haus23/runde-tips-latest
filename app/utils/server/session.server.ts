import { createCookieSessionStorage } from '@remix-run/node';

export const appSession = createCookieSessionStorage({
  cookie: {
    name: '_runde_tips',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { getSession, commitSession, destroySession } = appSession;
