import { STATUS_CODE, STATUS_TEXT, type StatusCode } from '@std/http/status';
import { Hono } from 'hono';
import { describeRoute, openAPISpecs } from 'hono-openapi';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';

import 'zod-openapi/extend';

import { createErrorSchema, jsonResponse } from '#lib/openapi';

import pkg from '../package.json';
import routes from './routes';

export const app = new Hono()
  .use(cors())
  .use(secureHeaders())
  .use(timing())
  .use(logger())
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
  .route('/', routes);

app.get(
  '/openapi',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: pkg.name,
        description: pkg.description,
        version: pkg.version,
      },
    },
  }),
);

app.notFound(() => {
  throw new HTTPException(STATUS_CODE.NotFound);
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
