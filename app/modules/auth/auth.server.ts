import { redirect } from '@remix-run/node';

import { invariant } from '#app/utils/invariant';
import { db } from '#app/utils/server/db.server';

import {
  commitSession,
  destroySession,
  getSession,
} from './auth-session.server';

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

export async function login(request: Request, email: string) {
  const session = await getSession(request.headers.get('Cookie'));

  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  invariant(user, 'Unknown authenticated user.');

  session.set('user:id', user.id);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/', {
    headers: { 'Set-Cookie': await destroySession(session) },
  });
}
