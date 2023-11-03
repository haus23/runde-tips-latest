import { redirect } from '@remix-run/node';

import { getSession } from './auth-session.server';

export async function getUserId(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('user:id');
  return userId ?? null;
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect('/');
  }
}
