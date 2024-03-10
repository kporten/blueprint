import type { MiddlewareHandler } from 'hono';
import { secureHeaders as secureHeadersMiddleware } from 'hono/secure-headers';

export const secureHeaders: MiddlewareHandler = secureHeadersMiddleware();
