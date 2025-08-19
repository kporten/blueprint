import { serve } from 'bun';

import { app } from '#app';
import { env } from '#lib/env';

const server = serve({
  port: env.PORT,
  fetch: app.fetch,
});

console.info(`Listening on ${server.url}`);
