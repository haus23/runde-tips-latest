import { json, type DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { getPublishedChampionships } from '#app/modules/api/model/championships.server';
import { ChampionshipSlug } from '#app/modules/api/schema';

import { FohHeader } from './header';
import { Notifications } from './notifications';

export async function loader({ params }: DataFunctionArgs) {
  // Despite not using the championshipSlug to load the current championship
  // we validate it anyway right here. Due to my routing configuration with the
  // optional championship slug as param, an route not matching elsewhere will
  // end here and in this loader. So we are here responsible for any 404 error.

  const { championship: slug } = params;

  // Possible slug? (matches /[a-b]{2}[0-9]{5})
  const parsedSlug = ChampionshipSlug.safeParse(slug);
  if (!parsedSlug.success) {
    throw new Response(null, {
      status: 404,
      statusText: `Not found`,
    });
  }

  // Load championships
  const championships = await getPublishedChampionships();

  // Real existing slug?
  if (slug) {
    const hasChampionshipWithSlug = championships.some((c) => c.slug === slug);
    if (!hasChampionshipWithSlug) {
      throw new Response(null, {
        status: 400,
        statusText: `Keine gültige Turnierkennung: ${slug}`,
      });
    }
  }

  return json({ championships });
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
