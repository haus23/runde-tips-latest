import type { DataFunctionArgs } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';

import {
  authenticate,
  redirectIfAuthenticated,
} from '#app/modules/auth/auth.server';

export async function loader({ request }: DataFunctionArgs) {
  await redirectIfAuthenticated(request);

  return null;
}

export async function action({ request }: DataFunctionArgs) {
  return await authenticate(request);
}

export default function LoginRoute() {
  const authSubmission = useFetcher<typeof action>();

  return (
    <div>
      <h2>Anmeldung</h2>
      <div>
        <authSubmission.Form method="POST">
          {(!authSubmission.data ||
            authSubmission.data.status === 'AWAIT_EMAIL') && (
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Bekannte Email-Adresse"
            ></input>
          )}
          {authSubmission.data &&
            authSubmission.data.status === 'AWAIT_TOTP' && (
              <input
                type="text"
                name="totp"
                autoComplete="one-time-code"
                required
                placeholder="Dein Login-Code"
              ></input>
            )}
        </authSubmission.Form>
        {authSubmission.data && authSubmission.data.error && (
          <span>{authSubmission.data.error}</span>
        )}
      </div>
      {authSubmission.state !== 'idle' && (
        <div>
          {authSubmission.data?.status === 'AWAIT_TOTP'
            ? 'Code wird überprüft'
            : 'Email wird geprüft'}
        </div>
      )}
    </div>
  );
}
