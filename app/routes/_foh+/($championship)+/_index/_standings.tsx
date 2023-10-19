import { json, type DataFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { db } from '#app/utils/server/db.server';

export async function loader({ params }: DataFunctionArgs) {
  const { championship: slug } = params;

  const championship = await db.query.championshipTable.findFirst({
    where: (championship, { eq, and }) =>
      and(
        eq(championship.published, true),
        slug ? eq(championship.slug, slug) : undefined,
      ),
    orderBy: (championship, { desc }) => [desc(championship.nr)],
  });

  if (!championship) {
    throw new Error('No championship found');
  }

  const ranking = await db.query.playerTable.findMany({
    where: (player, { eq }) => eq(player.championshipId, championship.id),
    orderBy: (player, { asc }) => [asc(player.rank)],
    with: { user: { columns: { name: true, slug: true } } },
  });

  return json({ championship, ranking });
}

export default function StandingsRoute() {
  const { championship, ranking } = useLoaderData<typeof loader>();

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
                  unstable_viewTransition
                  to={`/tipps/spieler?name=${r.user.slug}`}
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
