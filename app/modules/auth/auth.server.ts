import { json, redirect } from '@remix-run/node';

import { email, parse, string } from 'valibot';

import { db } from '#app/utils/server/db.server';

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
  const authResponse: AuthResponse = {
    status: 'AWAIT_EMAIL',
    error: null,
  };

  const form = await request.formData();

  const submittedEmail = form.get('email');
  if (submittedEmail) {
    const user = await db.query.userTable.findFirst({
      where: (users, { eq }) => eq(users.email, String(submittedEmail)),
    });

    if (!user) {
      authResponse.error = 'INVALID_EMAIL';
    }
  }

  // Initially returns AWAIT_EMAIL status and no error
  return json(authResponse);
}
