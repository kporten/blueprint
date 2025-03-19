import { STATUS_CODE, STATUS_TEXT } from '@std/http/status';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { validator } from 'hono-openapi/zod';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

import { db } from '#db/client';
import { taskSelectSchema } from '#db/schema';
import { createErrorSchema, jsonResponse } from '#lib/openapi';
import { validatorDefaultHook } from '#lib/validator';

export default new Hono()
  .use(
    describeRoute({
      responses: {
        [STATUS_CODE.InternalServerError]: jsonResponse(
          createErrorSchema(STATUS_CODE.InternalServerError),
          STATUS_TEXT[STATUS_CODE.InternalServerError],
        ),
      },
    }),
  )
  .get(
    '/',
    describeRoute({
      description: 'Get a list of tasks',
      responses: {
        [STATUS_CODE.OK]: jsonResponse(z.array(taskSelectSchema), 'Tasks'),
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
