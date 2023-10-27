import { json, redirect } from '@remix-run/node';

import { getSession } from './session.server';

export type AuthStatus = 'AWAIT_EMAIL' | 'AWAIT_TOTP';
export type AuthError = null | 'INVALID_EMAIL';

export type AuthResponse = {
  status: AuthStatus;
  error: AuthError;
};

export async function redirectIfAuthenticated(request: Request) {
  const authSession = await getSession(request.headers.get('Cookie'));

  if (authSession.has('sessionId')) {
    throw redirect('/');
  }
}

export async function authenticate(request: Request) {
  const form = await request.formData();

  // Initially returns AWAIT_EMAIL status and no error
  return json({
    status: 'AWAIT_EMAIL',
    error: null,
  } satisfies AuthResponse);
}
