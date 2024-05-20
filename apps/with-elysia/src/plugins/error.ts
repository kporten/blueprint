import { Elysia, InvertedStatusMap } from 'elysia';

import { UnauthorizedError } from '~/lib/errors';

import { env } from './env';

export const error = () =>
  new Elysia({ name: 'error' })
    .error({
      UnauthorizedError,
    })
    .use(env())
    .onError({ as: 'global' }, ({ code, error, set, env }) => {
      let message = error.message;

      switch (code) {
        case 'UNKNOWN': {
          console.error(error);

          if (env.NODE_ENV === 'production') {
            message = InvertedStatusMap[500];
          }
          break;
        }
        case 'VALIDATION': {
          if (error.type === 'response') {
            set.status = 500;

            console.error(error);

            if (env.NODE_ENV === 'production') {
              message = InvertedStatusMap[500];
            }
          } else {
            set.status = 400;
          }
          break;
        }
      }

      return { error: { code, message } };
    });
