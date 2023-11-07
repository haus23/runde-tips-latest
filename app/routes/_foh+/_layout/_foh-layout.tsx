import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { getPublishedChampionships } from '#modules/api/model/championships';

import { FohHeader } from './header';
import { Notifications } from './notifications';

export async function loader() {
  const championships = await getPublishedChampionships();
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
