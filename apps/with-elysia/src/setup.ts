import { cors } from '@elysiajs/cors';
import { Elysia, t } from 'elysia';

import { auth } from './plugins/auth';
import { env } from './plugins/env';
import { error } from './plugins/error';
import { securityHeaders } from './plugins/security-headers';

export const setup = new Elysia()
  .model({
    'error.common': t.Object({
      error: t.Object({
        code: t.String(),
        message: t.String(),
      }),
    }),
  })
  .use(env())
  .use(error())
  .use(cors())
  .use(securityHeaders())
  .use(auth());
