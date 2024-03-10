import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import type { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { envTyped } from '~/utils/adapter';

export const clerk: MiddlewareHandler = (c, next) =>
  clerkMiddleware({
    secretKey: envTyped(c).CLERK_SECRET_KEY,
    publishableKey: envTyped(c).CLERK_PUBLISHABLE_KEY,
  })(c, next);

export function authMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED);
    }

    await next();
  };
}
