import type { DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

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
  const actionResponse = useActionData<typeof action>();

  return (
    <div>
      <h2>Anmeldung</h2>
      {(!actionResponse || actionResponse.status === 'AWAIT_EMAIL') && (
        <div>
          <Form method="POST">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Bekannte Email-Adresse"
            ></input>
          </Form>
          {actionResponse && actionResponse.error && (
            <span>{actionResponse.error}</span>
          )}
        </div>
      )}
    </div>
  );
}
