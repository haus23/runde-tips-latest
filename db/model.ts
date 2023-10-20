import { createSelectSchema } from 'drizzle-zod';

import { championshipTable } from './schema';

export const Championship = createSelectSchema(championshipTable);
