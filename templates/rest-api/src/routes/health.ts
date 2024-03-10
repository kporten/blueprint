import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { HonoEnv } from '~/types/hono';
import { MimeTypes } from '~/utils/openapi';

const routeGetHealth = createRoute({
  description: 'Health check',
  method: 'get',
  path: '/',
  responses: {
    [StatusCodes.OK]: {
      content: {
        [MimeTypes['application/json']]: {
          schema: z
            .string()
            .openapi({ example: JSON.stringify(ReasonPhrases.OK) }),
        },
      },
      description: 'Health',
    },
  },
});

export default new OpenAPIHono<HonoEnv>().openapi(routeGetHealth, (c) => {
  return c.json(ReasonPhrases.OK);
});
