import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { errorHandler } from '~/handlers/error';
import { notFoundHandler } from '~/handlers/not-found';
import { clerk } from '~/middlewares/clerk';
import { cors } from '~/middlewares/cors';
import { etag } from '~/middlewares/etag';
import { logger } from '~/middlewares/logger';
import { secureHeaders } from '~/middlewares/secure-headers';
import { sentry } from '~/middlewares/sentry';
import { timing } from '~/middlewares/timing';
import health from '~/routes/health';
import v1 from '~/routes/v1';
import type { HonoEnv } from '~/types/hono';
import { SecuritySchemes } from '~/utils/openapi';
import pkg from '../package.json';

const app = new OpenAPIHono<HonoEnv>();

// middlewares
app.use('*', cors);
app.use('*', secureHeaders);
app.use('*', etag);
app.use('*', timing);
app.use('*', clerk);
app.use('*', sentry);
app.use('*', logger);

// routes
app
  .get('/', (c) => c.redirect('/health', 301))
  .route('/health', health)
  .route('/v1', v1);

// open api
app.openAPIRegistry.registerComponent(
  'securitySchemes',
  SecuritySchemes.bearerAuth,
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
);

app.get(
  '/reference',
  apiReference({
    spec: {
      content: app.getOpenAPI31Document({
        openapi: '3.1.0',
        info: {
          title: pkg.name,
          description: pkg.description,
          version: pkg.version,
        },
      }),
    },
  }),
);

// error handling
app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
