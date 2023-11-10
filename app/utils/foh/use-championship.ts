import { useRouteLoaderData } from '@remix-run/react';

import { Championship } from '#app/modules/api/schema';
import type { loader } from '#app/routes/_foh+/_layout';

export function useChampionship() {
  const data = useRouteLoaderData<typeof loader>('routes/_foh+/_layout/index');
  return Championship.parse(data?.championship);
}
