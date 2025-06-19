import { eq } from 'drizzle-orm';

import { taskTable } from '#db/schema';
import { db } from '#lib/db';

import type { TaskInsert, TaskSelect, TaskUpdate } from './schema';

export async function getTasks() {
  const tasks = await db.query.taskTable.findMany();

  return tasks;
}

export async function getTask(id: TaskSelect['id']) {
  const task = await db.query.taskTable.findFirst({
    where: eq(taskTable.id, id),
  });

  return task;
}

export async function insertTask(data: TaskInsert) {
  const [task] = await db.insert(taskTable).values(data).returning();

  return task!;
}

export async function updateTask(id: TaskSelect['id'], data: TaskUpdate) {
  const [task] = await db
    .update(taskTable)
    .set(data)
    .where(eq(taskTable.id, id))
    .returning();

  return task;
}

export async function deleteTask(id: TaskSelect['id']) {
  const [task] = await db
    .delete(taskTable)
    .where(eq(taskTable.id, id))
    .returning();

  return task;
}
