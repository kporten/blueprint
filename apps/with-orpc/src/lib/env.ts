import { getLogLevels } from '@logtape/logtape';
import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  // biome-ignore-start lint/style/useNamingConvention: env
  server: {
    DATABASE_URL: z.url({ protocol: /^postgresql$/ }),
    LOG_LEVEL_ORPC: z.enum(getLogLevels()).default('info'),
    NODE_ENV: z.enum(['development', 'production']),
    PORT: z.coerce.number().int().positive().default(4000),
  },
  // biome-ignore-end lint/style/useNamingConvention: env
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
