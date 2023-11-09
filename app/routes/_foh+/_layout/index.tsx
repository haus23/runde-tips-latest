import { json, type DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { getPublishedChampionships } from '#modules/api/model/championships.server';
import { ChampionshipSlug } from '#modules/api/schema';

import { FohHeader } from './header';
import { Notifications } from './notifications';

export async function loader({ params }: DataFunctionArgs) {
  const { championship: slug } = params;

  const parsedSlug = ChampionshipSlug.safeParse(slug);

  if (!parsedSlug.success) {
    throw new Response(null, {
      status: 404,
      statusText: `Not found`,
    });
  }

  const championships = await getPublishedChampionships();
  const championship = slug
    ? championships.find((c) => c.slug === slug)
    : championships[0];

  if (!championship) {
    throw new Response(null, {
      status: 400,
      statusText: `Keine gültige Turnierkennung: ${slug}`,
    });
  }

  return json({ championships, championship });
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
