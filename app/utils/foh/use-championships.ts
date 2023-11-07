import { useRouteLoaderData } from '@remix-run/react';

import { Championship } from '#modules/api/schema';
import type { loader } from '#routes/_foh+/_layout/_foh-layout';

export function useChampionships() {
  const data = useRouteLoaderData<typeof loader>(
    'routes/_foh+/_layout/_foh-layout',
  );

  return Championship.array().parse(data?.championships);
}
