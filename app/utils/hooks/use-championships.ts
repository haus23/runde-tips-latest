import { useParams, useRouteLoaderData } from '@remix-run/react';

import type { loader } from '#app/routes/_foh+/_layout';
import { Championship } from '#db/model';

export function useChampionships() {
  const { championship: slug } = useParams();
  const championshipsData = useRouteLoaderData<typeof loader>(
    'routes/_foh+/_layout',
  );

  const championships = Championship.array().parse(championshipsData);
  const current = slug
    ? championships.find((c) => c.slug === slug)
    : championships[0];

  if (!current) {
    throw new Error('No championship found');
  }

  return { championships, current };
}
