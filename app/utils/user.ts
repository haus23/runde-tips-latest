import { useRouteLoaderData } from '@remix-run/react';

import type { loader } from '#root';

import { invariant } from './invariant';

export function useIsAuthenticated() {
  const data = useRouteLoaderData<typeof loader>('root');

  return !!data && !!data.user;
}

export function useUser() {
  const data = useRouteLoaderData<typeof loader>('root');

  const user = data?.user;

  invariant(user, 'User is required');

  return user;
}
