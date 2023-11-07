export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
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
