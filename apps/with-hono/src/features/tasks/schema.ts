import type { z } from 'zod';

import { taskTable } from '#db/schema';
import { createInsertSchema, createSelectSchema } from '#lib/openapi';

export const taskSelectSchema = createSelectSchema(taskTable).openapi({
  ref: 'Task',
});

export type TaskSelect = z.infer<typeof taskSelectSchema>;

export const taskInsertSchema = createInsertSchema(taskTable, {
  description: (schema) => schema.trim().min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TaskInsert = z.infer<typeof taskInsertSchema>;

export const taskUpdateSchema = taskInsertSchema
  .partial()
  .refine((arg) => Object.keys(arg).length > 0);

export type TaskUpdate = z.infer<typeof taskUpdateSchema>;
