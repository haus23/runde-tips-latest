import { createSelectSchema } from 'drizzle-zod';

import { championshipTable } from '../orm/schema';

export const Championship = createSelectSchema(championshipTable);
