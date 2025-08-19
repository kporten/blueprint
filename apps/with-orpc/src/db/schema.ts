import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const taskTable = pgTable('task', {
  id: uuid().primaryKey().defaultRandom(),
  description: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
