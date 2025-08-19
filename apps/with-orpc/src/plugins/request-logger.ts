import type { Context } from '@orpc/server';
import type {
  StandardHandlerOptions,
  StandardHandlerPlugin,
} from '@orpc/server/standard';

import { orpcLogger } from '#lib/logger';

export class RequestLoggerPlugin<T extends Context>
  implements StandardHandlerPlugin<T>
{
  init(options: StandardHandlerOptions<T>): void {
    options.rootInterceptors ??= [];

    options.rootInterceptors.push(async ({ request, next }) => {
      const startTime = Date.now();

      const res = await next();
      const status = res.response?.status;

      const duration = Date.now() - startTime;

      orpcLogger.info('{method} {path} {status} in {duration}ms', {
        method: request.method,
        path: new URL(request.url).pathname,
        status,
        duration,
      });

      return res;
    });
  }
}
