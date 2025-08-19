import { neon } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { env } from '@/lib/env';

import * as schema from './schema';

const global = globalThis as unknown as {
  drizzle: NeonHttpDatabase<typeof schema> | undefined;
};

export const db =
  global.drizzle ??
  drizzle({
    client: neon(env.DATABASE_URL),
    schema,
    casing: 'snake_case',
  });

if (process.env.NODE_ENV === 'development') {
  global.drizzle = db;
}
