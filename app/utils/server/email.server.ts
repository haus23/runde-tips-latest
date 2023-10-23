import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  react,
  ...options
}: {
  to: string;
  subject: string;
} & { html: string; text: string; react?: never }) {
  const from = 'hallo@runde.tips';

  const email = {
    from,
    ...options,
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
