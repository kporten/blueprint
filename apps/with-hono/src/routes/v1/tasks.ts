import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver, validator } from 'hono-openapi/zod';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import z from 'zod';

import { HTTPException } from 'hono/http-exception';
import { errorSchema, mimeTypes } from '#/lib/openapi';
import { validatorDefaultHook } from '#/lib/validator';

const taskSchema = z
  .object({
    id: z
      .string()
      .uuid()
      .openapi({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }),
    title: z.string().openapi({ example: 'Task title' }),
  })
  .openapi({ ref: 'Task' });

const tasks = [
  {
    id: crypto.randomUUID(),
    title: 'Title 1',
  },
  {
    id: crypto.randomUUID(),
    title: 'Title 2',
  },
];

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
              schema: resolver(z.array(taskSchema)),
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
    (c) => {
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
              schema: resolver(taskSchema),
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
    validator('param', taskSchema.pick({ id: true }), validatorDefaultHook),
    (c) => {
      const param = c.req.valid('param');

      const task = tasks.find((task) => task.id === param.id);

      if (!task) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: 'Task not found',
        });
      }

      return c.json(task);
    },
  );
