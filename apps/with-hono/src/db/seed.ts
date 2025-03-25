import { reset, seed } from 'drizzle-seed';

import { db } from '#db/client';
import { taskTable } from '#db/schema';

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
