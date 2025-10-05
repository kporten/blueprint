import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { env } from '#lib/env';

import * as schema from './schema';

export const db = drizzle({
  client: neon(env.DATABASE_URL),
  schema,
  casing: 'snake_case',
});
