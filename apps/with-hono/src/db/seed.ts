import { reset, seed } from 'drizzle-seed';

import * as schema from '#db/schema';
import { db } from '#lib/db';

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
