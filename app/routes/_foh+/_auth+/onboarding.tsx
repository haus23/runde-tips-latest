import { redirect, type DataFunctionArgs } from '@remix-run/node';

import { getSession } from '#app/modules/auth/auth-session.server';

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('auth:email')) {
    return redirect('/login');
  }

  return null;
}

export default function OnboardingRoute() {
  return (
    <div>
      <h2>Login Code</h2>
    </div>
  );
}
