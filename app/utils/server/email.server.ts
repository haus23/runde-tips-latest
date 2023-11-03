import { type RequireAtLeastOne } from 'type-fest';

type EmailProps = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

export async function sendEmail({
  ...options
}: RequireAtLeastOne<EmailProps, 'text' | 'html'>) {
  const from = 'hallo@runde.tips';

  const email = {
    from,
    ...options,
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return {
      status: 'success' as const,
    };
  } else {
    return {
      status: 'error' as const,
    };
  }
}
