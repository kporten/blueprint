import { sentry as sentryMiddleware } from '@hono/sentry';
import type { MiddlewareHandler } from 'hono';
import { envTyped } from '~/utils/adapter';

import pkg from '../../package.json';

export const sentry: MiddlewareHandler = (c, next) =>
  sentryMiddleware({
    enabled: envTyped(c).NODE_ENV === 'development',
    dsn: envTyped(c).SENTRY_DSN,
    environment: envTyped(c).NODE_ENV,
    release: pkg.version,
  })(c, next);
