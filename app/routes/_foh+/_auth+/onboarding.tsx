import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { conform, useForm } from '@conform-to/react';
import { parse, refine } from '@conform-to/zod';
import { z } from 'zod';

import { getSession } from '#app/modules/auth/auth-session.server';
import { login, requireAnonymous } from '#app/modules/auth/auth.server';
import { validateLoginCode } from '#app/utils/server/totp.server';

function createFormSchema(constraint?: {
  isValidCode?: (code: string) => Promise<boolean>;
}) {
  return z.object({
    code: z
      .string({ required_error: 'Ohne Code geht es nicht weiter.' })
      .regex(/^\d{6}$/, 'Kein Code. Ein Code hat genau sechs Ziffern.')
      .pipe(
        z.string().superRefine((code, ctx) =>
          refine(ctx, {
            validate: () => constraint?.isValidCode?.(code),
            message: 'Ungültiger Code.',
          }),
        ),
      ),
  });
}

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  const session = await getSession(request.headers.get('Cookie'));

  const email = session.get('auth:email');
  if (!email) {
    return redirect('/login');
  }

  return null;
}

export async function action({ request }: DataFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  const email = session.get('auth:email');
  const secret = session.get('auth:secret');
  if (!email || !secret) {
    return redirect('/login');
  }

  const formData = await request.formData();

  const submission = await parse(formData, {
    schema: createFormSchema({
      isValidCode: async (code) => {
        return validateLoginCode(code, secret);
      },
    }),
    async: true,
  });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission);
  }

  return login(request, email);
}

export default function OnboardingRoute() {
  const lastSubmission = useActionData<typeof action>();

  const [form, fields] = useForm({
    id: 'totp',
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createFormSchema() });
    },
  });

  return (
    <div>
      <h2>Login Code</h2>
      <Form method="post" {...form.props}>
        <div>
          <label htmlFor={fields.code.id}>Code</label>
          <input
            {...conform.input(fields.code)}
            autoComplete="one-time-code"
            inputMode="numeric"
          />
          <div id={fields.code.errorId}>{fields.code.errors}</div>
        </div>
        <button>Anmelden</button>
      </Form>
    </div>
  );
}
