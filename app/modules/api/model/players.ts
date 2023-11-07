import { db } from '../db.server';

export async function getRankedPlayers(championshipId: number) {
  return await db.query.playerTable.findMany({
    where: (player, { eq }) => eq(player.championshipId, championshipId),
    orderBy: (player, { asc }) => [asc(player.rank)],
    with: { user: { columns: { name: true, slug: true } } },
  });
}
