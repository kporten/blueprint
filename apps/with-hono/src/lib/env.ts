import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  // biome-ignore-start lint/style/useNamingConvention: env
  server: {
    DATABASE_URL: z.string().url(),
  },
  // biome-ignore-end lint/style/useNamingConvention: env
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
