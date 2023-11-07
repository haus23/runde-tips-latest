import { useRouteLoaderData } from '@remix-run/react';

import { Championship } from '#modules/api/schema';
import type { loader } from '#routes/_foh+/($championship)+/_layout';

export function useChampionship() {
  const data = useRouteLoaderData<typeof loader>(
    'routes/_foh+/($championship)+/_layout',
  );
  return Championship.parse(data?.championship);
}
