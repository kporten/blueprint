import { serve } from 'bun';

import { STATUS_CODE, STATUS_TEXT } from '@std/http/status';

import handler from '#handler';
import { env } from '#lib/env';
import { initLogger, orpcLogger } from '#lib/logger';
import { securityHeaders } from '#middleware/security-headers';

await initLogger();

const server = serve({
  port: env.PORT,
  async fetch(request) {
    const { matched, response } = await handler.handle(request);

    if (matched) {
      return response;
    }

    return new Response(STATUS_TEXT[STATUS_CODE.NotFound], {
      status: STATUS_CODE.NotFound,
      headers: securityHeaders,
    });
  },
});

orpcLogger.info(`Listening on ${server.url}`);
