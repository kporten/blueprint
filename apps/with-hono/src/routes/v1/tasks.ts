import { createSelectSchema } from 'drizzle-zod';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver, validator } from 'hono-openapi/zod';
import { HTTPException } from 'hono/http-exception';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import z from 'zod';

import { taskTable } from '#/db/schema';
import { db } from '#/lib/db';
import { errorSchema, mimeTypes } from '#/lib/openapi';
import { validatorDefaultHook } from '#/lib/validator';

const taskSelectSchema = createSelectSchema(taskTable, {
  id: (schema) =>
    schema.openapi({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }),
  description: (schema) => schema.openapi({ example: 'Task description' }),
}).openapi({ ref: 'Task' });

export default new Hono()
  .get(
    '/',
    describeRoute({
      description: 'Get a list of tasks',
      responses: {
        [StatusCodes.OK]: {
          description: 'Task list',
          content: {
            [mimeTypes.json]: {
              schema: resolver(z.array(taskSelectSchema)),
            },
          },
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
          description: ReasonPhrases.INTERNAL_SERVER_ERROR,
          content: {
            [mimeTypes.json]: {
              schema: resolver(errorSchema),
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
        [StatusCodes.OK]: {
          description: 'Task',
          content: {
            [mimeTypes.json]: {
              schema: resolver(taskSelectSchema),
            },
          },
        },
        [StatusCodes.BAD_REQUEST]: {
          description: ReasonPhrases.BAD_REQUEST,
          content: {
            [mimeTypes.json]: {
              schema: resolver(errorSchema),
            },
          },
        },
        [StatusCodes.NOT_FOUND]: {
          description: ReasonPhrases.NOT_FOUND,
          content: {
            [mimeTypes.json]: {
              schema: resolver(errorSchema),
            },
          },
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
          description: ReasonPhrases.INTERNAL_SERVER_ERROR,
          content: {
            [mimeTypes.json]: {
              schema: resolver(errorSchema),
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
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: 'Task not found',
        });
      }

      return c.json(task);
    },
  );
