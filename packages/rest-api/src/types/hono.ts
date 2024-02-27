import type { ContextVariableMap } from 'hono';

export type HonoBindings = Record<string, unknown>;

export type HonoVariables = {
  clerk: ContextVariableMap['clerk'];
  sentry: ContextVariableMap['sentry'];
};

export type HonoEnv = {
  // biome-ignore lint/style/useNamingConvention: hono definition
  Bindings: HonoBindings;
  // biome-ignore lint/style/useNamingConvention: hono definition
  Variables: HonoVariables;
};

export type HonoAdapterEnv = {
  // biome-ignore lint/style/useNamingConvention: env definition
  CLERK_PUBLISHABLE_KEY: string;
  // biome-ignore lint/style/useNamingConvention: env definition
  CLERK_SECRET_KEY: string;
  // biome-ignore lint/style/useNamingConvention: env definition
  NODE_ENV?: string;
  // biome-ignore lint/style/useNamingConvention: env definition
  SENTRY_DSN: string;
};
