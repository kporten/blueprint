import { reset, seed } from 'drizzle-seed';

import { taskTable } from '#db/schema';
import { db } from '#lib/db';

await reset(db, { taskTable });

await seed(
  db,
  { taskTable },
  {
    seed: 1,
  },
).refine((f) => ({
  taskTable: {
    count: 100,
    columns: {
      description: f.loremIpsum({ sentencesCount: 5 }),
    },
  },
}));
