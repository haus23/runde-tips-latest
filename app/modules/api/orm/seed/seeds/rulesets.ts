import ky from 'ky';

import { drizzleInstance as db } from '#modules/api/orm/drizzle.instance';
import { rulesetTable } from '#modules/api/orm/schema';

export async function seedRulesets() {
  const rulesets = await ky
    .get('https://backend.runde.tips/api/v1/rules')
    .json<any[]>();

  rulesets.forEach(async (ruleset) => {
    await db
      .insert(rulesetTable)
      .values({
        name: ruleset.name,
        slug: ruleset.id,
        description: ruleset.description,
        extraQuestionRule: ruleset.extraQuestionRuleId,
        roundRule: ruleset.roundRuleId,
        matchRule: ruleset.matchRuleId,
        tipRule: ruleset.tipRuleId,
      })
      .onConflictDoNothing();
  });
}
