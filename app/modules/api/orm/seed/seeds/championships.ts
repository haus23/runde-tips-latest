import { eq } from 'drizzle-orm';
import ky from 'ky';

import { drizzleInstance as db } from '#modules/api/orm/drizzle.instance';
import { championshipTable, rulesetTable } from '#modules/api/orm/schema';

import { seedPlayers } from './championship/players';

export async function seedChampionships() {
  const championships = await ky
    .get('https://backend.runde.tips/api/v1/championships')
    .json<any[]>();

  const rulesets = await db.select().from(rulesetTable);

  championships.forEach(async (cs) => {
    const rulesetId = rulesets.find((r) => r.slug === cs.rulesId)?.id;
    if (!rulesetId) {
      throw new Error(`Unknown championship ruleset: ${cs.rulesId}`);
    }

    const previousChampionship = await db.query.championshipTable.findFirst({
      where: eq(championshipTable.slug, cs.id),
    });

    // No need to re-seed existing and completed championships
    if (!previousChampionship || !previousChampionship.completed) {
      console.log(`Seeding ${cs.name}`);

      const results = await db
        .insert(championshipTable)
        .values({
          slug: cs.id,
          name: cs.name,
          nr: cs.nr,
          published: cs.published,
          extraPointsPublished: cs.extraPointsPublished,
          completed: cs.completed,
          rulesetId,
        })
        .onConflictDoUpdate({
          target: championshipTable.slug,
          set: {
            published: cs.published,
            extraPointsPublished: cs.extraPointsPublished,
            completed: cs.completed,
          },
        })
        .returning();

      if (results[0]) {
        const championship = results[0];

        seedPlayers(championship);
      }
    }
  });
}
