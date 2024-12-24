import { apiReference } from '@scalar/hono-api-reference';
import { Hono } from 'hono';

import v1 from './v1';

export default new Hono()
  .get(
    '/',
    apiReference({
      spec: {
        url: '/openapi',
      },
    }),
  )
  .route('/v1', v1);
