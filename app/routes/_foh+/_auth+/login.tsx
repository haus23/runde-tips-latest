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
        <Form method="POST">
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Bekannte Email-Adresse"
          ></input>
        </Form>
      )}
    </div>
  );
}
