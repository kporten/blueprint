import type { MiddlewareHandler } from 'hono';
import { etag as etagMiddleware } from 'hono/etag';

export const etag: MiddlewareHandler = etagMiddleware();
