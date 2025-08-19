import { STATUS_CODE } from '@std/http/status';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { validator } from '#lib/validator';

import {
  createTask,
  deleteTask,
  findTask,
  listTasks,
  updateTask,
} from './data';
import { taskInsertSchema, taskSelectSchema, taskUpdateSchema } from './schema';

const app = new Hono();

app.get('/', async (c) => {
  const tasks = await listTasks();

  return c.json(tasks);
});

app.get(
  '/:id',
  validator('param', taskSelectSchema.pick({ id: true })),
  async (c) => {
    const param = c.req.valid('param');

    const task = await findTask(param.id);

    if (!task) {
      throw new HTTPException(STATUS_CODE.NotFound, {
        message: 'Task not found',
      });
    }

    return c.json(task);
  },
);

app.post('/', validator('json', taskInsertSchema), async (c) => {
  const json = c.req.valid('json');

  const task = await createTask(json);

  c.status(STATUS_CODE.Created);
  return c.json(task);
});

app.patch(
  '/:id',
  validator('param', taskSelectSchema.pick({ id: true })),
  validator('json', taskUpdateSchema),
  async (c) => {
    const param = c.req.valid('param');
    const json = c.req.valid('json');

    const task = await updateTask(param.id, json);

    if (!task) {
      throw new HTTPException(STATUS_CODE.NotFound, {
        message: 'Task not found',
      });
    }

    return c.json(task);
  },
);

app.delete(
  '/:id',
  validator('param', taskSelectSchema.pick({ id: true })),
  async (c) => {
    const param = c.req.valid('param');

    const task = await deleteTask(param.id);

    if (!task) {
      throw new HTTPException(STATUS_CODE.NotFound, {
        message: 'Task not found',
      });
    }

    c.status(STATUS_CODE.NoContent);
    return c.body(null);
  },
);

export default app;
