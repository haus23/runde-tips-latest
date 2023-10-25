import { eq } from 'drizzle-orm';
import { Authenticator } from 'remix-auth';
import { TOTPStrategy } from 'remix-auth-totp';

import { sessionTable, totpTable } from '#db/schema';

import { db } from './db.server';
import { sendEmail } from './email.server';
import { appSession } from './session.server';

type SessionKey = string;

export const authenticator = new Authenticator<SessionKey>(appSession, {
  throwOnError: true,
});

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.TOTP_ENCRYPTION_SECRET,
      totpGeneration: {
        charSet: '0123456789',
      },
      storeTOTP: async ({ hash, active, attempts }) => {
        await db.insert(totpTable).values({ hash, active, attempts });
      },
      sendTOTP: async ({ email, code, magicLink }) => {
        const user = await db.query.userTable.findFirst({
          where: (user, { eq }) => eq(user.email, email),
        });
        if (!user) {
          throw new Error('Unknown email address.');
        }
        await sendEmail({
          to: `${user.name} <${email}>`,
          subject: 'Tipprunde Login Code',
          html: '',
          text: `
Hallo ${user.name},
Zum Einloggen den Code ${code} nutzen oder den Link ${magicLink}.
`,
        });
      },
      handleTOTP: async (hash, data) => {
        const totp = await db.query.totpTable.findFirst({
          where: (totp, { eq }) => eq(totp.hash, hash),
        });

        if (!totp) {
          throw new Error("Can't find your code");
        }

        if (data) {
          const updatedTotp = await db
            .update(totpTable)
            .set({ ...data, expiresAt: String(data.expiresAt) })
            .where(eq(totpTable.hash, hash))
            .returning();
          if (!updatedTotp[0]) {
            throw new Error("Can't find your code");
          }
          return updatedTotp[0];
        }

        return totp;
      },
      validateEmail: async (email) => {
        const user = await db.query.userTable.findFirst({
          where: (user, { eq }) => eq(user.email, email),
        });
        if (!user) {
          throw new Error('Unknown email address.');
        }
      },
    },
    async (data) => {
      console.log(data);
      // Lookup User by email
      const user = await db.query.userTable.findFirst({
        where: (user, { eq }) => eq(user.email, data.email),
      });
      if (!user) {
        throw new Error('Unknown email address.');
      }

      // Create session for user
      const [authSession] = await db
        .insert(sessionTable)
        .values({ userId: user.id })
        .returning();
      if (!authSession) {
        throw new Error("Can't creat auth session.");
      }

      return authSession.id;
    },
  ),
);
