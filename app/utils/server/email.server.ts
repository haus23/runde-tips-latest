import type { ReactElement } from 'react';

import { renderAsync } from '@jsx-email/all';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  react,
  ...options
}: {
  to: string;
  subject: string;
  react: ReactElement;
}) {
  const from = 'hallo@runde.tips';
  const [html, text] = await Promise.all([
    renderAsync(react),
    renderAsync(react, { plainText: true }),
  ]);
  const email = {
    from,
    ...options,
    html,
    text,
  };

  try {
    const data = await resend.emails.send(email);

    return {
      status: 'success',
      data: data.id,
    } as const;
  } catch (error) {
    return {
      status: 'error',
      error,
    } as const;
  }
}
