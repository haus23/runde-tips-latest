import ky from 'ky';

import { drizzleInstance as db } from '#app/modules/api/orm/drizzle.instance';
import {
  championshipTable,
  playerTable,
  userTable,
} from '#app/modules/api/orm/schema';

type Championship = typeof championshipTable.$inferSelect;

export async function seedPlayers(championship: Championship) {
  const players = await ky
    .get(
      `https://backend.runde.tips/api/v1/championships/${championship.slug}/players`,
    )
    .json<any[]>();

  const users = await db.select().from(userTable);

  players.forEach(async (player) => {
    const userId = users.find((u) => u.slug === player.playerId)?.id;
    if (!userId) {
      throw new Error(`Unknown player: ${player.playerId}`);
    }

    await db
      .insert(playerTable)
      .values({
        firebaseId: player.id,

        points: player.points,
        extraPoints: player.extraPoints,
        totalPoints: player.totalPoints,
        rank: player.rank,

        userId: userId,
        championshipId: championship.id,
      })
      .onConflictDoUpdate({
        target: playerTable.firebaseId,
        set: {
          points: player.points,
          extraPoints: player.extraPoints,
          totalPoints: player.totalPoints,
          rank: player.rank,
        },
      });
  });
}
