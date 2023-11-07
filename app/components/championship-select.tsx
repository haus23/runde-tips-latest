import { type ChangeEvent } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';

import { useChampionships } from '#utils/hooks/use-championships';
import { useViewSegment } from '#utils/route-handle';

export function ChampionshipSelect() {
  const { championships, current } = useChampionships();
  const { search } = useLocation();
  const viewSegment = useViewSegment();
  const navigate = useNavigate();

  function handleSelect(ev: ChangeEvent<HTMLSelectElement>) {
    const slug = ev.target.value;
    const championship = slug === championships[0]?.slug ? '' : slug;
    navigate(
      {
        pathname: `/${[championship, viewSegment].filter(Boolean).join('/')}`,
        search,
      },
      { unstable_viewTransition: true },
    );
  }

  return (
    <select value={current.slug} onChange={handleSelect} name="slug">
      {championships.map((c) => (
        <option key={c.id} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
