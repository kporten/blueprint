import { STATUS_CODE, STATUS_TEXT, type StatusCode } from '@std/http/status';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';

import tasksRoutes from '#features/tasks/routes';

export const app = new Hono();

app.use(cors());
app.use(secureHeaders());
app.use(timing());
app.use(logger());

app.route('/tasks', tasksRoutes);

app.notFound((c) => {
  return c.json(
    {
      status: STATUS_CODE.NotFound,
      message: STATUS_TEXT[STATUS_CODE.NotFound],
    },
    STATUS_CODE.NotFound,
  );
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        status: err.status,
        message: err.message || STATUS_TEXT[err.status as StatusCode],
      },
      err.status,
    );
  }

  console.error(err);

  return c.json(
    {
      status: STATUS_CODE.InternalServerError,
      message: STATUS_TEXT[STATUS_CODE.InternalServerError],
    },
    STATUS_CODE.InternalServerError,
  );
});
