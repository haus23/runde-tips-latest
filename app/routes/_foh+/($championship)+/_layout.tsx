import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';

import { db } from '#app/utils/server/db.server';

export async function loader() {
  const championships = await db.query.championshipTable.findMany({
    where: (championship, { eq }) => eq(championship.published, true),
    orderBy: (championship, { desc }) => [desc(championship.nr)],
  });

  return championships;
}

export default function FohLayout() {
  const championships = useLoaderData<typeof loader>();

  return (
    <div>
      <Link to="/" unstable_viewTransition>
        <h1>runde.tips</h1>
      </Link>
      <ul>
        {championships.map((c) => (
          <li key={c.id}>
            <NavLink to={`/${c.slug}`} unstable_viewTransition>
              {c.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
