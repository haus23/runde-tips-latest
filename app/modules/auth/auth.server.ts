import { redirect } from '@remix-run/node';

import { getUserByEmail, getUserById } from '#modules//api/model/users';
import { invariant } from '#utils/invariant';

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

  return userId && (await getUserById(userId));
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect('/');
  }
}

export async function isKnownEmail(email: string) {
  const user = await getUserByEmail(email);
  return user !== null;
}

export async function login(request: Request, email: string) {
  const session = await getSession(request.headers.get('Cookie'));

  const user = await getUserByEmail(email);
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
