import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { requireAnonymous, validateEmail } from '#app/modules/auth/auth.server';

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  return null;
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));

  const validEmail = await validateEmail(email);

  if (!validEmail) {
    return json({
      payload: {
        email,
      },
      error: {
        email: 'Unbekannte Email-Adresse',
      },
    });
  }

  return redirect('/');
}

export default function LoginRoute() {
  const data = useActionData<typeof action>();

  return (
    <div>
      <h2>Anmeldung</h2>
      <Form method="post">
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Deine Email-Adresse"
          defaultValue={data?.payload.email}
        />
      </Form>
      <div>{data?.error.email}</div>
    </div>
  );
}
