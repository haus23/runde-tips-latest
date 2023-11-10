import { Link } from '@remix-run/react';

import { useUser } from '#app/utils/auth/user';

export function UserMenu() {
  const user = useUser();

  return (
    <div className="flex gap-x-2">
      {user.roles.includes('ADMIN') && <Link to="/manager">Manager</Link>}
      <Link to="/logout">Log out</Link>
    </div>
  );
}
