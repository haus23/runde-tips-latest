import { redirect } from '@remix-run/node';

import { db } from '#app/utils/server/db.server';

import { getSession } from './auth-session.server';

export async function getUserId(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('user:id');
  return userId ?? null;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);

  return (
    (userId &&
      (await db.query.userTable.findFirst({
        where: (user, { eq }) => eq(user.id, userId),
      }))) ||
    null
  );
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect('/');
  }
}

export async function isKnownEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  return user !== undefined;
}
