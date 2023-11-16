import { redirect } from '@remix-run/node';

import {
  getUserByEmail,
  getUserById,
} from '#app/modules/api/model/users.server';
import { invariant } from '#app/utils/invariant';

import { UserRole } from '../api/schema';
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

  return userId ? await getUserById(userId) : null;
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect('/');
  }
}

export async function requireUserInRole(
  role: UserRole,
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const user = await getUser(request);
  const roles = UserRole.array().parse(JSON.parse(user?.roles || '[]'));

  if (!roles.includes(role)) {
    const requestUrl = new URL(request.url);
    redirectTo =
      redirectTo === null
        ? null
        : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
    const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null;
    const loginRedirect = ['/login', loginParams?.toString()]
      .filter(Boolean)
      .join('?');
    throw redirect(loginRedirect);
  }
  return user;
}

export async function isKnownEmail(email: string) {
  const user = await getUserByEmail(email);
  return user !== null;
}

export async function login(
  request: Request,
  email: string,
  redirectTo?: string,
) {
  const session = await getSession(request.headers.get('Cookie'));

  const user = await getUserByEmail(email);
  invariant(user, 'Unknown authenticated user.');

  session.set('user:id', user.id);

  return redirect(redirectTo || '/', {
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
