import { Authenticator } from 'remix-auth';

import type { User } from '#db/model';

import { authSession } from './auth-session.server';
import { totpStrategy } from './auth-strategy.server';

const authenticator = new Authenticator<User>(authSession, {
  throwOnError: true,
});
authenticator.use(totpStrategy, 'TOTP');

export { authenticator };
