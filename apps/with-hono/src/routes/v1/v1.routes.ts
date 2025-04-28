import { Hono } from 'hono';

import tasks from './tasks/tasks.routes';

export default new Hono().route('/tasks', tasks);
