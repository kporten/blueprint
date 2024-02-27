import { OpenAPIHono } from '@hono/zod-openapi';
import type { HonoEnv } from '~/types/hono';
import users from './users';

export default new OpenAPIHono<HonoEnv>().route('/users', users);
