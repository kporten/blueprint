import { Hono } from 'hono';

import tasks from './tasks/route';

export default new Hono().route('/tasks', tasks);
