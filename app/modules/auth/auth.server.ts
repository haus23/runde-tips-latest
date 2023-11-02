import { createElement } from 'react';
import { json, redirect } from '@remix-run/node';

import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import { safeParse, string } from 'valibot';

import { db } from '#app/utils/server/db.server';
import { sendEmail } from '#app/utils/server/email.server';
import { sessionTable } from '#db/schema';

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
  const submittedEmail = safeParse(string(), form.get('email'));
  const submittedTotp = safeParse(string(), form.get('totp'));

  // Read any session data
  const authSession = await getSession(request.headers.get('Cookie'));
  const authEmail = authSession.get('authEmail');

  if (submittedEmail.success) {
    const email = submittedEmail.output;
    // Auth Step 1: Email
    const user = await db.query.userTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!user) {
      authResponse.error = 'INVALID_EMAIL';
    } else {
      authResponse.status = 'AWAIT_TOTP';
      authSession.flash('authEmail', email);

      const { otp } = generateTOTP({
        secret: `${email}#${process.env.TOTP_ENCRYPTION_SECRET}`,
        period: 60,
      });
      await sendEmail({
        to: `${user.name} <${email}>`,
        subject: 'Dein Login-Code',
        react: createElement(CodeEmail, { username: user.name, code: otp }),
      });
    }
  } else if (authEmail) {
    // Auth Step 2: TOTP
    if (submittedTotp.success) {
      const otp = submittedTotp.output;
      const isValid = verifyTOTP({
        otp,
        secret: `${authEmail}#${process.env.TOTP_ENCRYPTION_SECRET}`,
        period: 60,
      });

      if (isValid) {
        const user = await db.query.userTable.findFirst({
          where: (users, { eq }) => eq(users.email, authEmail),
        });

        if (user) {
          const [result] = await db
            .insert(sessionTable)
            .values({ userId: user.id })
            .returning({ sessionId: sessionTable.id });

          if (result) {
            authSession.set('sessionId', result.sessionId);
          }
        }
      } else {
        // Do not accept a wrong TOTP by now.
        // TODO: invalidate the generated TOTP (after x attempts)
        authResponse.status = 'AWAIT_EMAIL';
        authResponse.error = 'INVALID_TOTP';
      }
    } else {
      // No submitted TOTP -> regenerate and send new code
    }
  }

  return json(authResponse, {
    headers: {
      'Set-Cookie': await commitSession(authSession),
    },
  });
}
