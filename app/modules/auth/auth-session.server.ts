import { createCookieSessionStorage } from '@remix-run/node';

export type SessionUser = {
  'user:id': number;
};

export const authSession = createCookieSessionStorage<SessionUser>({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.APP_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { getSession, commitSession, destroySession } = authSession;
