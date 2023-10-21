import { type ChangeEvent } from 'react';

import { useChampionships } from '#app/utils/hooks/use-championships';
import { useCurrentView } from '#app/utils/hooks/use-current-view';
import { useNavigate } from '#app/utils/hooks/use-navigate';

export function ChampionshipSelect() {
  const { championships, current } = useChampionships();
  const { featureSegment, viewSegment, search } = useCurrentView();
  const navigate = useNavigate();

  function handleSelect(ev: ChangeEvent<HTMLSelectElement>) {
    const slug = ev.target.value;
    const championshipSegment = slug === championships[0]?.slug ? '' : slug;
    navigate({
      pathname: [featureSegment, championshipSegment, viewSegment]
        .filter(Boolean)
        .join('/'),
      search,
    });
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
