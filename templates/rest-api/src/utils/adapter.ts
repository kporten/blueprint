import type { Context } from 'hono';
import { env } from 'hono/adapter';
import type { HonoAdapterEnv, HonoEnv } from '~/types/hono';

export function envTyped(c: Context<HonoEnv>) {
  return env<HonoAdapterEnv, Context<HonoEnv>>(c);
}
