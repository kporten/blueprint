import type { MiddlewareHandler } from 'hono';
import { timing as timingMiddleware } from 'hono/timing';
import { envTyped } from '~/utils/adapter';

export const timing: MiddlewareHandler = timingMiddleware({
  enabled: (c) => envTyped(c).NODE_ENV === 'development',
});
