import { json, type DataFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { getPublishedChampionshipBySlug } from '#modules/api/model/championships';
import { getRankedPlayers } from '#modules/api/model/players';

export const handle = { viewPath: '' };

export async function loader({ params }: DataFunctionArgs) {
  const { championship: slug } = params;

  const championship = await getPublishedChampionshipBySlug(slug);

  if (!championship) {
    throw new Error('No championship found');
  }

  const ranking = await getRankedPlayers(championship.id);

  return json({ championship, ranking });
}

export default function StandingsRoute() {
  const { championship, ranking } = useLoaderData<typeof loader>();
  const { championship: championshipSlug = '' } = useParams();

  return (
    <div>
      <h2>
        {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}{' '}
        {championship.name}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Platz</th>
            <th>Name</th>
            {championship.completed && <th>Zusatzpunkte</th>}
            <th>{championship.completed ? 'Gesamtpunkte' : 'Punkte'}</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r) => (
            <tr key={r.id}>
              <td>{r.rank}</td>
              <td>
                <Link
                  to={{
                    pathname: `/${[championshipSlug, 'tipps/spieler']
                      .filter(Boolean)
                      .join('/')}`,
                    search: `name=${r.user.slug}`,
                  }}
                >
                  {r.user.name}
                </Link>
              </td>
              {championship.completed && <td>{r.extraPoints}</td>}
              <td>{r.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
