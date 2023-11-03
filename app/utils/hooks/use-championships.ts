import { useParams, useRouteLoaderData } from '@remix-run/react';

import type { loader } from '#app/routes/_foh+/_layout/_foh-layout';

import { invariant } from '../invariant';

export function useChampionships() {
  const { championship: slug = '' } = useParams();

  const championships = useRouteLoaderData<typeof loader>(
    'routes/_foh+/_layout/_foh-layout',
  );
  invariant(championships, 'Unexcpected undefined championships');

  const current = slug
    ? championships.find((c) => c.slug === slug)
    : championships[0];
  invariant(current, 'No championship found');

  return { championships, current };
}
