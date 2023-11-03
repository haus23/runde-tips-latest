import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { conform, useForm } from '@conform-to/react';
import { parse, refine } from '@conform-to/zod';
import { z } from 'zod';

import { isKnownEmail, requireAnonymous } from '#app/modules/auth/auth.server';

function createLoginSchema(constraint?: {
  isKnownEmail?: (email: string) => Promise<boolean>;
}) {
  return z.object({
    email: z
      .string({ required_error: 'Email-Adresse ist notwendig.' })
      .email('Ungültige Email-Adresse.')
      .pipe(
        z.string().superRefine((email, ctx) =>
          refine(ctx, {
            validate: () => constraint?.isKnownEmail?.(email),
            message: 'Unbekannte Email-Adresse.',
          }),
        ),
      ),
  });
}

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  return null;
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();

  const submission = await parse(formData, {
    schema: createLoginSchema({ isKnownEmail }),
    async: true,
  });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission);
  }

  return redirect('/');
}

export default function LoginRoute() {
  const lastSubmission = useActionData<typeof action>();
  const [form, fields] = useForm({
    id: 'login',
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createLoginSchema() });
    },
  });

  return (
    <div>
      <h2>Anmeldung</h2>
      <Form method="post" {...form.props}>
        <div>
          <label htmlFor={fields.email.id}>Email</label>
          <input {...conform.input(fields.email, { type: 'email' })} />
          <div id={fields.email.errorId}>{fields.email.errors}</div>
        </div>
        <button>Login Code anfordern</button>
      </Form>
    </div>
  );
}
