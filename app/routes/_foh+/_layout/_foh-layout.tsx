import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { db } from '#app/modules/api/db.server';

import { FohHeader } from './header';
import { Notifications } from './notifications';

export async function loader() {
  const championships = await db.query.championshipTable.findMany({
    where: (championship, { eq }) => eq(championship.published, true),
    orderBy: (championship, { desc }) => [desc(championship.nr)],
  });

  return json(championships);
}

export default function FohLayout() {
  return (
    <>
      <FohHeader />
      <main className="mx-auto mt-4 max-w-5xl pb-10 sm:mt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <aside></aside>
      <Notifications />
    </>
  );
}
