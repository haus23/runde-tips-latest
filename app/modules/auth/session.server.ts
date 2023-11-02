import { createCookieSessionStorage } from '@remix-run/node';

type AuthSessionData = {
  sessionId?: string;
};

type AuthFlashData = {
  authEmail: string;
};

const authSession = createCookieSessionStorage<AuthSessionData, AuthFlashData>({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { getSession, commitSession, destroySession } = authSession;
