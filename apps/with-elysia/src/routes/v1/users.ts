import { isClerkAPIResponseError } from '@clerk/shared';
import { Elysia, NotFoundError, t } from 'elysia';

import { setup } from '~/setup';

export const userType = t.Object({
  id: t.String(),
  fullName: t.Nullable(t.String()),
  primaryEmailAddress: t.Optional(t.String()),
});

export const users = new Elysia({ prefix: '/users' })
  .use(setup)
  .get(
    '/',
    async ({ clerk }) => {
      const { data: users } = await clerk.users.getUserList();

      return {
        data: users.map((user) => ({
          id: user.id,
          fullName: user.fullName,
          primaryEmailAddress: user.primaryEmailAddress?.emailAddress,
        })),
      };
    },
    {
      response: {
        200: t.Object({
          data: t.Array(userType),
        }),
        500: 'error.common',
      },
    },
  )
  .get(
    '/:id',
    async ({ clerk, params }) => {
      try {
        const user = await clerk.users.getUser(params.id);

        return {
          data: {
            id: user.id,
            fullName: user.fullName,
            primaryEmailAddress: user.primaryEmailAddress?.emailAddress,
          },
        };
      } catch (e) {
        if (
          isClerkAPIResponseError(e) &&
          e.errors[0]?.code === 'resource_not_found'
        ) {
          throw new NotFoundError('user not found');
        }

        throw e;
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      response: {
        200: t.Object({
          data: userType,
        }),
        400: 'error.common',
        404: 'error.common',
        500: 'error.common',
      },
    },
  );
