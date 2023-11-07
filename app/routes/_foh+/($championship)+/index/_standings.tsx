import { json, type DataFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { getRankedPlayers } from '#modules/api/model/players';
import { useChampionship } from '#utils/hooks/foh/use-championship';

export const handle = { viewPath: '' };

export async function loader({ params }: DataFunctionArgs) {
  const { championship: slug } = params;

  const ranking = await getRankedPlayers(slug);
  return json({ ranking });
}

export default function StandingsRoute() {
  const { championship: championshipSlug = '' } = useParams();
  const championship = useChampionship();
  const { ranking } = useLoaderData<typeof loader>();

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
