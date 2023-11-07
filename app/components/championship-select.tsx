import { type ChangeEvent } from 'react';
import { useLocation, useNavigate, useParams } from '@remix-run/react';

import { useChampionships } from '#utils/hooks/foh/use-championships';
import { useViewSegment } from '#utils/route-handle';

export function ChampionshipSelect() {
  const { championship: currentSlug = '' } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const championships = useChampionships();
  const viewSegment = useViewSegment();

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
    <select value={currentSlug} onChange={handleSelect} name="slug">
      {championships.map((c) => (
        <option key={c.id} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
