import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';

import { conform, useForm } from '@conform-to/react';
import { parse, refine } from '@conform-to/zod';
import { z } from 'zod';

import { TextField } from '#app/components/(ui)/text-field';
import { getUserByEmail } from '#app/modules/api/model/users.server';
import {
  commitSession,
  getSession,
} from '#app/modules/auth/auth-session.server';
import { isKnownEmail, requireAnonymous } from '#app/modules/auth/auth.server';
import { createCodeEmailContent } from '#app/modules/auth/code.email';
import { invariant } from '#app/utils/invariant';
import { sendEmail } from '#app/utils/server/email.server';
import { generateLoginCode } from '#app/utils/server/totp.server';

function createFormSchema(constraint?: {
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

  const session = await getSession(request.headers.get('Cookie'));
  return json({ email: session.get('auth:email') });
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();

  const submission = await parse(formData, {
    schema: createFormSchema({ isKnownEmail }),
    async: true,
  });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission);
  }

  const user = await getUserByEmail(submission.value.email);
  invariant(user, 'Unknown authenticated user.');

  const { code, secret } = generateLoginCode();
  const body = createCodeEmailContent({ username: user.name, code });
  const smtpResult = await sendEmail({
    to: `${user.name} <${user.email}>`,
    subject: 'Tipprunde Login Code',
    ...body,
  });

  if (smtpResult.status === 'error') {
    throw new Error('Probleme beim Email-Versand.');
  }

  const session = await getSession(request.headers.get('Cookie'));
  session.flash('auth:email', submission.value.email);
  session.flash('auth:secret', secret);

  return redirect('/onboarding', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function LoginRoute() {
  const { email } = useLoaderData<typeof loader>();
  const lastSubmission = useActionData<typeof action>();

  const [form, fields] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createFormSchema() });
    },
    defaultValue: { email },
  });

  return (
    <div>
      <h2>Anmeldung</h2>
      <Form method="post" {...form.props}>
        <TextField
          label="Email"
          type="email"
          isRequired
          {...conform.input(fields.email)}
          validate={() => fields.email.errors}
        />
        <button>Login-Code anfordern</button>
      </Form>
    </div>
  );
}
