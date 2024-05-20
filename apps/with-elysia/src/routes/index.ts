import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { setup } from '~/setup';

import pkg from '../../package.json';
import { v1 } from './v1';

export const routes = new Elysia()
  .use(setup)
  .get('/', () => ({
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
  }))
  .guard(
    {
      isAuth: true,
      detail: {
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    (app) => app.use(v1),
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: pkg.name,
          description: pkg.description,
          version: pkg.version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
    }),
  );
