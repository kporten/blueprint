import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = createEnv({
  server: {
    // biome-ignore lint/style/useNamingConvention: env
    DATABASE_URL: z.url(),
  },
  runtimeEnv: {
    // biome-ignore lint/style/useNamingConvention: env
    DATABASE_URL: process.env.DATABASE_URL,
  },
  emptyStringAsUndefined: true,
});
