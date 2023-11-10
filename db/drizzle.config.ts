import { type Config } from 'drizzle-kit';

export default {
  driver: 'libsql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:./data/development.db',
  },
  schema: 'db/schema.ts',
} satisfies Config;
