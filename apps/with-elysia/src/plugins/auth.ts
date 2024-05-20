import { createClerkClient, verifyToken } from '@clerk/backend';
import { bearer } from '@elysiajs/bearer';
import { Elysia } from 'elysia';

import { UnauthorizedError } from '~/lib/errors';

import { env } from './env';

export const auth = () =>
  new Elysia({
    name: 'auth',
  })
    .use(env())
    .use(bearer())
    .derive({ as: 'global' }, async ({ bearer, env }) => {
      const clerk = createClerkClient({
        secretKey: env.CLERK_SECRET_KEY,
      });

      const token = bearer
        ? await verifyToken(bearer, {
            secretKey: env.CLERK_SECRET_KEY,
            authorizedParties: env.CLERK_AUTHORIZED_PARTIES
              ? env.CLERK_AUTHORIZED_PARTIES.split(',')
              : undefined,
            jwtKey: env.CLERK_JWT_KEY,
          })
        : undefined;

      return { clerk, token };
    })
    .macro(({ onBeforeHandle }) => ({
      isAuth: (value: boolean) => {
        onBeforeHandle(({ token }) => {
          if (value && !token) {
            throw new UnauthorizedError();
          }
        });
      },
    }));
