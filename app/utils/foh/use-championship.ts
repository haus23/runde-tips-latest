import { useParams } from '@remix-run/react';

import { invariant } from '../invariant';
import { useChampionships } from './use-championships';

export function useChampionship() {
  const championships = useChampionships();
  const { championship: slug } = useParams();

  const championship =
    championships.find((c) => c.slug === slug) || championships[0];
  invariant(championship);

  return championship;
}
