import { type ChangeEvent } from 'react';
import { useLocation, useMatches, useNavigate } from '@remix-run/react';

import { object, safeParse, string } from 'valibot';

import { useChampionships } from '#app/utils/hooks/use-championships';

export function ChampionshipSelect() {
  const { championships, current } = useChampionships();
  const { search } = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  const viewMatch = matches.at(-1);
  const handle = safeParse(object({ viewPath: string() }), viewMatch?.handle);
  const viewPath = handle.success ? handle.output.viewPath : '';

  function handleSelect(ev: ChangeEvent<HTMLSelectElement>) {
    const slug = ev.target.value;
    const championship = slug === championships[0]?.slug ? '' : slug;
    navigate({
      pathname: `/${[championship, viewPath].filter(Boolean).join('/')}`,
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
