import { singleton } from '#app/utils/server/singleton.server';
import { drizzleInstance } from '#db/drizzle.instance';

export const db = singleton('db', () => drizzleInstance);
