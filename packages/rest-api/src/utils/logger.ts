import type { Context } from 'hono';
import type { HonoEnv } from '~/types/hono';
import { envTyped } from './adapter';

export function log(c: Context<HonoEnv>, message: string, ...rest: string[]) {
  if (envTyped(c).NODE_ENV === 'development') {
    console.info(message, ...rest);
  }
}
