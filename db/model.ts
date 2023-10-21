import { createSelectSchema } from 'drizzle-valibot';

import { championshipTable } from './schema';

export const Championship = createSelectSchema(championshipTable);
