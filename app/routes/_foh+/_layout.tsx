import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { ChampionshipSelect } from '#app/components/championship-select';
import { db } from '#app/utils/server/db.server';

export async function loader() {
  const championships = await db.query.championshipTable.findMany({
    where: (championship, { eq }) => eq(championship.published, true),
    orderBy: (championship, { desc }) => [desc(championship.nr)],
  });

  return json(championships);
}

export default function FohLayout() {
  const championships = useLoaderData<typeof loader>();

  return (
    <div>
      <Link to="/" unstable_viewTransition>
        <h1>runde.tips</h1>
      </Link>
      <ChampionshipSelect />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
