import { Elysia } from 'elysia';

type Env = {
  // biome-ignore lint/style/useNamingConvention: env
  NODE_ENV?: string;
  // biome-ignore lint/style/useNamingConvention: env
  CLERK_SECRET_KEY: string;
  // biome-ignore lint/style/useNamingConvention: env
  CLERK_JWT_KEY?: string;
  // biome-ignore lint/style/useNamingConvention: env
  CLERK_AUTHORIZED_PARTIES?: string;
};

export const env = (init?: Record<string, unknown>) => {
  const env = (init ?? globalThis.process?.env) as Env;

  return new Elysia({
    name: 'env',
  }).decorate({ env });
};
