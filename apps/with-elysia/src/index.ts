import serverTiming from '@elysiajs/server-timing';
import { Elysia } from 'elysia';

import { routes } from './routes';
import { setup } from './setup';

new Elysia()
  .use(serverTiming())
  .use(setup)
  .use(routes)
  .listen(process.env.PORT ?? 3000, ({ url }) => {
    console.info(`Server ready: ${url}`);
  });
