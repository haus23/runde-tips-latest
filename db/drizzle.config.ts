import { type Config } from 'drizzle-kit';

export default {
  driver: 'libsql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:./data/development.db',
  },
  schema: 'app/modules/api/orm/schema.ts',
} satisfies Config;
