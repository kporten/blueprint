import type { MiddlewareHandler } from 'hono';
import { cors as corsMiddleware } from 'hono/cors';

export const cors: MiddlewareHandler = corsMiddleware();
