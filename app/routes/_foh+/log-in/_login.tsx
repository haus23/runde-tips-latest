import { json, type DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';

import { authenticator } from '#app/utils/server/auth.server';
import { commitSession, getSession } from '#app/utils/server/session.server';

export async function loader({ request }: DataFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  const cookie = await getSession(request.headers.get('Cookie'));
  const authEmail = cookie.get('auth:email');
  const authError = cookie.get(authenticator.sessionErrorKey);

  // Commit session to clear any `flash` error message.
  return json(
    { authEmail, authError },
    {
      headers: {
        'set-cookie': await commitSession(cookie),
      },
    },
  );
}

export async function action({ request }: DataFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/log-in',
    failureRedirect: '/log-in',
  });
}

export default function LoginRoute() {
  const { authEmail, authError } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>Anmeldung für {authEmail || 'noch unklar'}</h2>
      {!authEmail && (
        <Form method="POST">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Insert email .."
            required
          />
          <button type="submit">Send Code</button>
        </Form>
      )}

      {/* Code Verification Form. */}
      {authEmail && (
        <>
          <Form method="POST">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              name="code"
              placeholder="Insert code .."
              required
            />

            <button type="submit">Continue</button>
          </Form>

          {/* Renders the form that requests a new code. */}
          {/* Email input is not required, it's already stored in Session. */}
          <Form method="POST">
            <button type="submit">Request new Code</button>
          </Form>
        </>
      )}

      {/* Email Errors Handling. */}
      {!authEmail && <span>{authError?.message}</span>}
      {/* Code Errors Handling. */}
      {authEmail && <span>{authError?.message}</span>}
    </div>
  );
}
