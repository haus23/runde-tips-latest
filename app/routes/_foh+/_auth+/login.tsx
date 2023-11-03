import { json, type DataFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import {
  commitSession,
  getSession,
} from '#app/modules/auth/auth-session.server';
import { authenticator } from '#app/modules/auth/auth.server';

export async function loader({ request }: DataFunctionArgs) {
  await authenticator.isAuthenticated(request, { successRedirect: '/' });

  const session = await getSession(request.headers.get('Cookie'));
  const authEmail = session.get('auth:email');
  const authError = session.get(authenticator.sessionErrorKey);

  return json(
    { authEmail, authError },
    {
      headers: {
        'set-cookie': await commitSession(session),
      },
    },
  );
}

export async function action({ request }: DataFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/login',
    failureRedirect: '/login',
  });
}

export default function LoginRoute() {
  const { authEmail, authError } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>Anmeldung</h2>
      <Form method="POST">
        {!authEmail && (
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Deine Email-Adresse"
          ></input>
        )}
        {authEmail && (
          <input
            type="text"
            name="code"
            autoComplete="one-time-code"
            inputMode="numeric"
            placeholder="Dein Login-Code"
          ></input>
        )}
      </Form>
      {authError && JSON.stringify(authError)}
    </div>
  );
}
