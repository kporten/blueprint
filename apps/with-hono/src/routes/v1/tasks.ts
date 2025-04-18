import { STATUS_CODE } from '@std/http/status';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { validator } from 'hono-openapi/zod';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

import {
  taskInsertSchema,
  taskSelectSchema,
  taskTable,
  taskUpdateSchema,
} from '#db/schema';
import { db } from '#lib/db';
import { createErrorSchema, jsonResponse } from '#lib/openapi';
import { validatorDefaultHook } from '#lib/validator';

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
      const tasks = await db.query.taskTable.findMany();

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
    validator(
      'param',
      taskSelectSchema.pick({ id: true }),
      validatorDefaultHook,
    ),
    async (c) => {
      const param = c.req.valid('param');

      const task = await db.query.taskTable.findFirst({
        where: eq(taskTable.id, param.id),
      });

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
    validator('json', taskInsertSchema, validatorDefaultHook),
    async (c) => {
      const json = c.req.valid('json');

      const [task] = await db.insert(taskTable).values(json).returning();

      return c.json(task, STATUS_CODE.Created);
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
    validator(
      'param',
      taskSelectSchema.pick({ id: true }),
      validatorDefaultHook,
    ),
    validator('json', taskUpdateSchema, validatorDefaultHook),
    async (c) => {
      const param = c.req.valid('param');
      const json = c.req.valid('json');

      const [task] = await db
        .update(taskTable)
        .set(json)
        .where(eq(taskTable.id, param.id))
        .returning();

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
    validator(
      'param',
      taskSelectSchema.pick({ id: true }),
      validatorDefaultHook,
    ),
    async (c) => {
      const param = c.req.valid('param');

      const deleted = await db
        .delete(taskTable)
        .where(eq(taskTable.id, param.id));

      if (deleted.rowCount === 0) {
        throw new HTTPException(STATUS_CODE.NotFound, {
          message: 'Task not found',
        });
      }

      return c.body(null, STATUS_CODE.NoContent);
    },
  );
