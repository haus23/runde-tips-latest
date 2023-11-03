import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import { base32 } from '@scure/base';

const TOTP_DEFAULTS = {
  period: 120,
  algorithm: 'SHA256',
};

export function generateLoginCode(email: string) {
  const { otp } = generateTOTP({
    secret: base32.encode(
      new TextEncoder().encode(`${email}#${process.env.APP_SECRET}`),
    ),
    ...TOTP_DEFAULTS,
  });
  return otp;
}

export function validateLoginCode(email: string, code: string) {
  const result = verifyTOTP({
    otp: code,
    secret: base32.encode(
      new TextEncoder().encode(`${email}#${process.env.APP_SECRET}`),
    ),
    ...TOTP_DEFAULTS,
  });
  return result !== null;
}
