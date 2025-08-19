import { ORPCError } from '@orpc/server';
import { STATUS_CODE } from '@std/http/status';
import * as z from 'zod';

import { orpc } from '#lib/orpc';

import {
  createTask,
  deleteTask,
  findTask,
  listTasks,
  updateTask,
} from './data';
import { taskInsertSchema, taskSelectSchema, taskUpdateSchema } from './schema';

const listHandler = orpc
  .route({ method: 'GET', path: '/', description: 'Get a list of tasks' })
  .output(z.array(taskSelectSchema))
  .handler(async () => {
    const tasks = await listTasks();
    return tasks;
  });

const findHandler = orpc
  .route({ method: 'GET', path: '/{id}' })
  .errors({
    // biome-ignore-start lint/style/useNamingConvention: errors
    BAD_REQUEST: {},
    NOT_FOUND: {
      message: 'Task not found',
    },
    // biome-ignore-end lint/style/useNamingConvention: errors
  })
  .input(
    z.object({
      params: taskSelectSchema.pick({ id: true }),
    }),
  )
  .output(taskSelectSchema)
  .handler(async ({ input, errors }) => {
    const task = await findTask(input.params.id);

    if (!task) {
      throw errors.NOT_FOUND();
    }

    return task;
  });

const createHandler = orpc
  .route({
    method: 'POST',
    path: '/',
    successStatus: STATUS_CODE.Created,
  })
  .errors({
    // biome-ignore-start lint/style/useNamingConvention: errors
    BAD_REQUEST: {},
    // biome-ignore-end lint/style/useNamingConvention: errors
  })
  .input(
    z.object({
      body: taskInsertSchema,
    }),
  )
  .output(taskSelectSchema)
  .handler(async ({ input }) => {
    const task = await createTask(input.body);

    if (!task) {
      throw new ORPCError('INTERNAL_SERVER_ERROR');
    }

    return task;
  });

const updateHandler = orpc
  .route({ method: 'PATCH', path: '/{id}' })
  .errors({
    // biome-ignore-start lint/style/useNamingConvention: errors
    BAD_REQUEST: {},
    NOT_FOUND: {
      message: 'Task not found',
    },
    // biome-ignore-end lint/style/useNamingConvention: errors
  })
  .input(
    z.object({
      params: taskSelectSchema.pick({ id: true }),
      body: taskUpdateSchema,
    }),
  )
  .output(taskSelectSchema)
  .handler(async ({ input, errors }) => {
    const task = await updateTask(input.params.id, input.body);

    if (!task) {
      throw errors.NOT_FOUND();
    }

    return task;
  });

const deleteHandler = orpc
  .route({
    method: 'DELETE',
    path: '/{id}',
    successStatus: STATUS_CODE.NoContent,
  })
  .errors({
    // biome-ignore-start lint/style/useNamingConvention: errors
    BAD_REQUEST: {},
    NOT_FOUND: {
      message: 'Task not found',
    },
    // biome-ignore-end lint/style/useNamingConvention: errors
  })
  .input(
    z.object({
      params: taskSelectSchema.pick({ id: true }),
    }),
  )
  .handler(async ({ input, errors }) => {
    const task = await deleteTask(input.params.id);

    if (!task) {
      throw errors.NOT_FOUND();
    }
  });

export default orpc
  .prefix('/tasks')
  .tag('Tasks')
  .router({
    tasks: {
      list: listHandler,
      find: findHandler,
      create: createHandler,
      update: updateHandler,
      remove: deleteHandler,
    },
  });
