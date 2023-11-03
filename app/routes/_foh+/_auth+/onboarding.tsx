import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { z } from 'zod';

import {
  commitSession,
  getSession,
} from '#app/modules/auth/auth-session.server';

const schema = z.object({
  code: z
    .string({ required_error: 'Ohne Code geht es nicht weiter.' })
    .regex(/\d{5}/, 'Kein Code. Ein Code hat genau sechs Ziffern.'),
});

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('auth:email')) {
    return redirect('/login');
  }

  return null;
}

export async function action({ request }: DataFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const authEmail = session.get('auth:email');

  const formData = await request.formData();

  const submission = parse(formData, { schema });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission);
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function OnboardingRoute() {
  const lastSubmission = useActionData<typeof action>();

  const [form, fields] = useForm({
    id: 'totp',
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  return (
    <div>
      <h2>Login Code</h2>
      <Form method="post" {...form.props}>
        <div>
          <label htmlFor={fields.code.id}>Code</label>
          <input {...conform.input(fields.code, {})} />
          <div id={fields.code.errorId}>{fields.code.errors}</div>
        </div>
        <button>Anmelden</button>
      </Form>
    </div>
  );
}
