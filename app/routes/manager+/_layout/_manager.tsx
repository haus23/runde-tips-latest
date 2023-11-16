import type { DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { requireUserInRole } from '#app/modules/auth/auth.server';

export async function loader({ request }: DataFunctionArgs) {
  await requireUserInRole('ADMIN', request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div>
      <h1>Manager</h1>
      <Outlet />
    </div>
  );
}
