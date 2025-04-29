import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import 'zod-openapi/extend';

export const taskTable = pgTable('task', {
  id: text()
    .primaryKey()
    .$default(() => createId()),
  description: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const taskSelectSchema = createSelectSchema(taskTable).openapi({
  ref: 'Task',
});

export const taskInsertSchema = createInsertSchema(taskTable, {
  description: (schema) => schema.trim().min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const taskUpdateSchema = taskInsertSchema
  .partial()
  .refine((arg) => Object.keys(arg).length > 0);
