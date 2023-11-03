import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import { base32 } from '@scure/base';

const TOTP_DEFAULTS = {
  period: 120,
  algorithm: 'SHA256',
};

export function generateLoginCode() {
  const { otp, secret } = generateTOTP({
    ...TOTP_DEFAULTS,
  });
  return { code: otp, secret };
}

export function validateLoginCode(code: string, secret: string) {
  const result = verifyTOTP({
    otp: code,
    secret,
    ...TOTP_DEFAULTS,
  });
  return result !== null;
}
