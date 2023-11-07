import { db } from '../db.server';
import { getPublishedChampionshipBySlug } from './championships';

export async function getRankedPlayers(championshipSlug?: string) {
  const championship = await getPublishedChampionshipBySlug(championshipSlug);

  return await db.query.playerTable.findMany({
    where: (player, { eq }) => eq(player.championshipId, championship.id),
    orderBy: (player, { asc }) => [asc(player.rank)],
    with: { user: { columns: { name: true, slug: true } } },
  });
}
