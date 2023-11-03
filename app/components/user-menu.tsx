import { Link } from '@remix-run/react';

export function UserMenu() {
  return (
    <div className="flex gap-x-2">
      <Link to="/logout">Log out</Link>
    </div>
  );
}
