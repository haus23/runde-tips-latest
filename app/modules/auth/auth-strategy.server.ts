import { eq } from 'drizzle-orm';
import { AuthorizationError, type StrategyVerifyCallback } from 'remix-auth';
import {
  TOTPStrategy,
  type HandleTOTP,
  type SendTOTP,
  type StoreTOTP,
  type TOTPVerifyParams,
  type ValidateEmail,
} from 'remix-auth-totp';

import { db } from '#app/utils/server/db.server';
import { sendEmail } from '#app/utils/server/email.server';
import { User } from '#db/model';
import { totpTable } from '#db/schema';

import { createCodeEmailBody } from './code.email';

const secret = process.env.APP_SECRET;

const validateEmail: ValidateEmail = async (email) => {
  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user) {
    throw new AuthorizationError('Unbekannte Email-Adresse.');
  }
};

const storeTOTP: StoreTOTP = async ({ hash, active, attempts }) => {
  await db.insert(totpTable).values({ hash, active, attempts });
};

const handleTOTP: HandleTOTP = async (hash, data) => {
  const totp = await db.query.totpTable.findFirst({
    where: (totp, { eq }) => eq(totp.hash, hash),
  });

  if (data && totp) {
    let { active, attempts, expiresAt } = data;
    if (expiresAt && expiresAt instanceof Date) {
      expiresAt = expiresAt.toISOString();
    }

    const [result] = await db
      .update(totpTable)
      .set({ active, attempts, expiresAt })
      .where(eq(totpTable.hash, hash))
      .returning();
    if (result) {
      return result;
    }
  }

  return totp ?? null;
};

const sendTOTP: SendTOTP<User> = async ({ email, code }) => {
  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user) {
    throw new AuthorizationError('Unbekannte Email-Adresse.');
  }

  const body = createCodeEmailBody({ username: user.name, code });
  await sendEmail({
    to: `${user.name} <${email}>`,
    subject: 'Tipprunde Login Code',
    ...body,
  });
};

const verifyUser: StrategyVerifyCallback<User, TOTPVerifyParams> = async ({
  email,
}) => {
  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user) {
    throw new AuthorizationError('Unbekannte Email-Adresse.');
  }

  return user;
};

export const totpStrategy = new TOTPStrategy(
  {
    secret,
    validateEmail,
    storeTOTP,
    handleTOTP,
    sendTOTP,
    totpGeneration: { charSet: '0123456789' },
    magicLinkGeneration: { enabled: false },
  },
  verifyUser,
);
