import { STATUS_CODE } from '@std/http/status';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

import {
  taskInsertSchema,
  taskSelectSchema,
  taskUpdateSchema,
} from '#features/tasks/schema';
import {
  deleteTask,
  getTask,
  getTasks,
  insertTask,
  updateTask,
} from '#features/tasks/service';
import { createErrorSchema, jsonResponse } from '#lib/openapi';
import { validator } from '#lib/validator';

export default new Hono()
  .get(
    '/',
    describeRoute({
      tags: ['Tasks'],
      description: 'Get a list of tasks',
      responses: {
        [STATUS_CODE.OK]: jsonResponse(z.array(taskSelectSchema), 'Task list'),
      },
    }),
    async (c) => {
      const tasks = await getTasks();

      return c.json(tasks);
    },
  )
  .get(
    '/:id',
    describeRoute({
      tags: ['Tasks'],
      description: 'Get a task by id',
      responses: {
        [STATUS_CODE.OK]: jsonResponse(taskSelectSchema, 'Task'),
        [STATUS_CODE.BadRequest]: jsonResponse(
          createErrorSchema(STATUS_CODE.BadRequest),
          'Task request error',
        ),
        [STATUS_CODE.NotFound]: jsonResponse(
          createErrorSchema(STATUS_CODE.NotFound),
          'Task not found error',
        ),
      },
    }),
    validator('param', taskSelectSchema.pick({ id: true })),
    async (c) => {
      const param = c.req.valid('param');

      const task = await getTask(param.id);

      if (!task) {
        throw new HTTPException(STATUS_CODE.NotFound, {
          message: 'Task not found',
        });
      }

      return c.json(task);
    },
  )
  .post(
    '/',
    describeRoute({
      tags: ['Tasks'],
      description: 'Add a task',
      responses: {
        [STATUS_CODE.Created]: jsonResponse(taskSelectSchema, 'Created task'),
        [STATUS_CODE.BadRequest]: jsonResponse(
          createErrorSchema(STATUS_CODE.BadRequest),
          'Task request error',
        ),
      },
    }),
    validator('json', taskInsertSchema),
    async (c) => {
      const json = c.req.valid('json');

      const task = await insertTask(json);

      c.status(STATUS_CODE.Created);
      return c.json(task);
    },
  )
  .patch(
    '/:id',
    describeRoute({
      tags: ['Tasks'],
      description: 'Update a task',
      responses: {
        [STATUS_CODE.OK]: jsonResponse(taskSelectSchema, 'Updated task'),
        [STATUS_CODE.BadRequest]: jsonResponse(
          createErrorSchema(STATUS_CODE.BadRequest),
          'Task request error',
        ),
        [STATUS_CODE.NotFound]: jsonResponse(
          createErrorSchema(STATUS_CODE.NotFound),
          'Task not found error',
        ),
      },
    }),
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
  )
  .delete(
    '/:id',
    describeRoute({
      tags: ['Tasks'],
      description: 'Delete a task',
      responses: {
        [STATUS_CODE.NoContent]: { description: 'Task deleted' },
        [STATUS_CODE.BadRequest]: jsonResponse(
          createErrorSchema(STATUS_CODE.BadRequest),
          'Task request error',
        ),
        [STATUS_CODE.NotFound]: jsonResponse(
          createErrorSchema(STATUS_CODE.NotFound),
          'Task not found error',
        ),
      },
    }),
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
