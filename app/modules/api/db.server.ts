import { singleton } from '#app/utils/server/singleton.server';

import { drizzleInstance } from './orm/drizzle.instance';

export const db = singleton('db', () => drizzleInstance);
