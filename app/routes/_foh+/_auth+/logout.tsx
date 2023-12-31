import type { LoaderFunctionArgs } from '@remix-run/node';

import { logout } from '#app/modules/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return logout(request);
}
