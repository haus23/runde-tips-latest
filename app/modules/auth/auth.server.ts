import { createElement } from 'react';
import { json, redirect } from '@remix-run/node';

import { generateTOTP, verifyTOTP } from '@epic-web/totp';

import { db } from '#app/utils/server/db.server';
import { sendEmail } from '#app/utils/server/email.server';

import { CodeEmail } from './CodeEmail';
import { commitSession, getSession } from './session.server';

export type AuthStatus = 'AWAIT_EMAIL' | 'AWAIT_TOTP';
export type AuthError = null | 'INVALID_EMAIL' | 'INVALID_TOTP';

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
  // Initially returns AWAIT_EMAIL status and no error
  const authResponse: AuthResponse = {
    status: 'AWAIT_EMAIL',
    error: null,
  };

  // Read any form data
  const form = await request.formData();
  const submittedEmail = String(form.get('email'));
  const submittedTotp = String(form.get('totp'));

  // Read any session data
  const authSession = await getSession(request.headers.get('Cookie'));
  const authEmail = authSession.get('authEmail');

  if (submittedEmail) {
    // Auth Step 1: Email
    const user = await db.query.userTable.findFirst({
      where: (users, { eq }) => eq(users.email, submittedEmail),
    });

    if (!user) {
      authResponse.error = 'INVALID_EMAIL';
    } else {
      authResponse.status = 'AWAIT_TOTP';
      authSession.flash('authEmail', submittedEmail);

      const { otp } = generateTOTP({
        secret: `${submittedEmail}#${process.env.TOTP_ENCRYPTION_SECRET}`,
        period: 60,
      });
      await sendEmail({
        to: `${user.name} <${user.email}>`,
        subject: 'Dein Login-Code',
        react: createElement(CodeEmail, { username: user.name, code: otp }),
      });
    }
  } else if (authEmail) {
    // Auth Step 2: TOTP
    if (submittedTotp) {
    }
  }

  return json(authResponse, {
    headers: {
      'Set-Cookie': await commitSession(authSession),
    },
  });
}
