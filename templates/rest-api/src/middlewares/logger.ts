import type { MiddlewareHandler } from 'hono';
import { logger as loggerMiddleware } from 'hono/logger';
import { log } from '~/utils/logger';

export const logger: MiddlewareHandler = (c, next) =>
  loggerMiddleware((message) => log(c, message))(c, next);
