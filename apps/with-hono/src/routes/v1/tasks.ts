import { STATUS_CODE, STATUS_TEXT } from '@std/http/status';
import { createSelectSchema } from 'drizzle-zod';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver, validator } from 'hono-openapi/zod';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

import { taskTable } from '#db/schema';
import { db } from '#lib/db';
import { createErrorSchema } from '#lib/openapi';
import { validatorDefaultHook } from '#lib/validator';

const taskSelectSchema = createSelectSchema(taskTable, {
  id: (schema) =>
    schema.openapi({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }),
  description: (schema) => schema.openapi({ example: 'Task description' }),
  createdAt: (schema) =>
    schema.openapi({ example: '0000-00-00T00:00:00.000Z' }),
  updatedAt: (schema) =>
    schema.openapi({ example: '0000-00-00T00:00:00.000Z' }),
}).openapi({ ref: 'Task' });

export default new Hono()
  .use(
    describeRoute({
      responses: {
        [STATUS_CODE.InternalServerError]: {
          description: STATUS_TEXT[STATUS_CODE.InternalServerError],
          content: {
            'application/json': {
              schema: resolver(
                createErrorSchema(STATUS_CODE.InternalServerError),
              ),
            },
          },
        },
      },
    }),
  )
  .get(
    '/',
    describeRoute({
      description: 'Get a list of tasks',
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Tasks',
          content: {
            'application/json': {
              schema: resolver(z.array(taskSelectSchema)),
            },
          },
        },
      },
    }),
    async (c) => {
      const tasks = await db.query.taskTable.findMany({
        orderBy: (table, { asc }) => [asc(table.id)],
      });

      return c.json(tasks);
    },
  )
  .get(
    '/:id',
    describeRoute({
      description: 'Get a task by id',
      responses: {
        [STATUS_CODE.OK]: {
          description: 'Task',
          content: {
            'application/json': {
              schema: resolver(taskSelectSchema),
            },
          },
        },
        [STATUS_CODE.BadRequest]: {
          description: 'Task request error',
          content: {
            'application/json': {
              schema: resolver(createErrorSchema(STATUS_CODE.BadRequest)),
            },
          },
        },
        [STATUS_CODE.NotFound]: {
          description: 'Task not found error',
          content: {
            'application/json': {
              schema: resolver(createErrorSchema(STATUS_CODE.NotFound)),
            },
          },
        },
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
        where: (table, { eq }) => eq(table.id, param.id),
      });

      if (!task) {
        throw new HTTPException(STATUS_CODE.NotFound, {
          message: 'Task not found',
        });
      }

      return c.json(task);
    },
  );
