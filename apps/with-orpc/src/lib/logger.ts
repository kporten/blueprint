import {
  ansiColorFormatter,
  configure,
  getConsoleSink,
  getLogger,
  jsonLinesFormatter,
} from '@logtape/logtape';

import { env } from './env';

export const initLogger = async () => {
  const isDevelopment = env.NODE_ENV === 'development';

  await configure({
    sinks: {
      console: getConsoleSink({
        formatter: isDevelopment ? ansiColorFormatter : jsonLinesFormatter,
      }),
    },
    loggers: [
      {
        category: ['logtape', 'meta'],
        sinks: ['console'],
        lowestLevel: 'warning',
      },
      {
        category: ['orpc'],
        sinks: ['console'],
        lowestLevel: env.LOG_LEVEL_ORPC,
      },
    ],
  });
};

export const orpcLogger = getLogger('orpc');
