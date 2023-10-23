import type { DataFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { email, parse, string } from 'valibot';

import { db } from '#app/utils/server/db.server';
import { sendEmail } from '#app/utils/server/email.server';

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
  const emailAddr = parse(string([email()]), body.get('email'));

  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, emailAddr),
  });

  if (!user) {
    return { msg: 'Email-Adresse ist nicht bekannt.' };
  }

  if (user) {
    sendEmail({
      to: emailAddr,
      subject: `Tipprunde Login`,
      html: '',
      text: `Zum Einloggen den Code nutzen oder den Link.`,
    });
    return { msg: 'Email mit Code wurde verschickt.' };
  }
}

export default function LoginRoute() {
  const actionResponse = useActionData<typeof action>();

  return (
    <div>
      <h2>Anmeldung</h2>
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
      {actionResponse && <span>{actionResponse.msg}</span>}
    </div>
  );
}
