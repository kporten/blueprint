import { reset, seed } from 'drizzle-seed';

import { db } from '#db/client';
import * as schema from '#db/schema';

await reset(db, schema);

await seed(db, schema, {
  seed: 1,
}).refine((f) => ({
  taskTable: {
    columns: {
      description: f.loremIpsum({ sentencesCount: 5 }),
    },
    count: 100,
  },
}));
