import type { ReactElement } from 'react';

import { renderAsync } from '@jsx-email/all';

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

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Problem beim Email-Versand');
  }
}
