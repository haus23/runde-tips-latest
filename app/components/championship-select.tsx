import { type ChangeEvent } from 'react';
import { useNavigate } from '@remix-run/react';

import { useChampionships } from '#app/utils/hooks/use-championships';
import { useCurrentView } from '#app/utils/hooks/use-current-view';

export function ChampionshipSelect() {
  const { championships, current } = useChampionships();
  const { featureSegment, viewSegment, search } = useCurrentView();
  const navigate = useNavigate();

  function handleSelect(ev: ChangeEvent<HTMLSelectElement>) {
    const slug = ev.target.value;
    const championshipSegment = slug === championships[0]?.slug ? '' : slug;
    navigate(
      {
        pathname: [featureSegment, championshipSegment, viewSegment]
          .filter(Boolean)
          .join('/'),
        search,
      },
      { unstable_viewTransition: true },
    );
  }

  return (
    <select value={current.slug} onChange={handleSelect}>
      {championships.map((c) => (
        <option key={c.id} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
