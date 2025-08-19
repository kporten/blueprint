import { createEnv } from '@t3-oss/env-nextjs';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import * as z from 'zod';

export const env = createEnv({
  // biome-ignore-start lint/style/useNamingConvention: env
  server: {
    DATABASE_URL: z.url({ protocol: /^postgresql$/ }),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  // biome-ignore-end lint/style/useNamingConvention: env
  emptyStringAsUndefined: true,
  skipValidation: process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD,
});
