import { Hono } from 'hono';

const app = new Hono().get('/', (c) => {
  return c.json('OK');
});

export default {
  port: 3000,
  fetch: app.fetch,
};
