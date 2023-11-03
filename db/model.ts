import { createSelectSchema } from 'drizzle-valibot';
import type { Output } from 'valibot';

import { championshipTable, userTable } from './schema';

export const Championship = createSelectSchema(championshipTable);

export const User = createSelectSchema(userTable);
export type User = Output<typeof User>;
