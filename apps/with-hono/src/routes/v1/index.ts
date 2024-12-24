import { Hono } from 'hono';

import tasks from './tasks';

export default new Hono().route('/tasks', tasks);
