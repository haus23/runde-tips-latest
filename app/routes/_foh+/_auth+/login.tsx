import type { DataFunctionArgs } from '@remix-run/node';

import { requireAnonymous } from '#app/modules/auth/auth.server';

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  return null;
}

export default function LoginRoute() {
  return (
    <div>
      <h2>Anmeldung</h2>
    </div>
  );
}
