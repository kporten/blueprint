import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const taskTable = pgTable('task', {
  id: uuid().primaryKey().defaultRandom(),
  description: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
