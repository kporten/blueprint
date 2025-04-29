import { afterAll, afterEach, beforeAll, mock } from 'bun:test';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import { reset } from 'drizzle-seed';

import { taskTable } from '#db/schema';

const db = drizzle({
  client: new PGlite(),
  schema: {
    taskTable,
  },
  casing: 'snake_case',
});

mock.module('#lib/db', () => {
  return { db };
});

beforeAll(async () => {
  await migrate(db, { migrationsFolder: './migrations' });
});

afterEach(async () => {
  await reset(db, {
    taskTable,
  });
});

afterAll(async () => {
  await db.$client.close();
});
