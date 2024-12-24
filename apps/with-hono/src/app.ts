import { Hono } from 'hono';
import { openAPISpecs } from 'hono-openapi';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';

import 'zod-openapi/extend';

import pkg from '../package.json';
import routes from './routes';

export const app = new Hono()
  .use(cors())
  .use(secureHeaders())
  .use(timing())
  .use(logger())
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
  throw new HTTPException(StatusCodes.NOT_FOUND);
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        status: err.status,
        code: StatusCodes[err.status],
        message: err.message || getReasonPhrase(err.status),
      },
      err.status,
    );
  }

  console.error(err);

  return c.json(
    {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      code: StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    },
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
});
