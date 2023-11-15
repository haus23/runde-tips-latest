import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { championshipTable, playerTable } from '#db/schema';

export const Championship = createSelectSchema(championshipTable);
export const Player = createSelectSchema(playerTable);

export const ChampionshipSlug = z
  .string()
  .regex(/^[a-z]{2}\d{4}$/, 'Bad championship id')
  .optional();
