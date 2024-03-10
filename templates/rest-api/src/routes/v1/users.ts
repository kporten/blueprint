import { isClerkAPIResponseError } from '@clerk/shared';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { authMiddleware } from '~/middlewares/clerk';
import type { HonoEnv } from '~/types/hono';
import {
  BadRequestErrorSchema,
  MimeTypes,
  NotFoundErrorSchema,
  SecuritySchemes,
  defaultHook,
} from '~/utils/openapi';

const UserSchema = z
  .object({
    id: z.string().openapi({ example: 'user_...' }),
    name: z.string().nullable().openapi({ example: 'John' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
  })
  .openapi('User');

const routeGetUsers = createRoute({
  description: 'Get a list of users',
  method: 'get',
  path: '/',
  security: [{ [SecuritySchemes.bearerAuth]: [] }],
  responses: {
    [StatusCodes.OK]: {
      content: {
        [MimeTypes['application/json']]: {
          schema: z.array(UserSchema),
        },
      },
      description: 'User list',
    },
  },
});

const routeGetUser = createRoute({
  description: 'Get a user by id',
  method: 'get',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string().startsWith('user_'),
    }),
  },
  security: [{ [SecuritySchemes.bearerAuth]: [] }],
  responses: {
    [StatusCodes.OK]: {
      content: {
        [MimeTypes['application/json']]: {
          schema: UserSchema,
        },
      },
      description: 'User',
    },
    [StatusCodes.BAD_REQUEST]: {
      content: {
        [MimeTypes['application/json']]: {
          schema: BadRequestErrorSchema,
        },
      },
      description: ReasonPhrases.BAD_REQUEST,
    },
    [StatusCodes.NOT_FOUND]: {
      content: {
        [MimeTypes['application/json']]: {
          schema: NotFoundErrorSchema,
        },
      },
      description: ReasonPhrases.NOT_FOUND,
    },
  },
});

const app = new OpenAPIHono<HonoEnv>({ defaultHook });

app
  .use(routeGetUsers.getRoutingPath(), authMiddleware())
  .use(routeGetUser.getRoutingPath(), authMiddleware());

export default app
  .openapi(routeGetUsers, async (c) => {
    const users = await c.get('clerk').users.getUserList();

    return c.json(
      users.map((user) => ({
        id: user.id,
        name: user.firstName,
        email: user.emailAddresses[0].emailAddress,
      })),
    );
  })
  .openapi(routeGetUser, async (c) => {
    const param = c.req.valid('param');

    try {
      const user = await c.get('clerk').users.getUser(param.id);

      return c.json({
        id: user.id,
        name: user.firstName,
        email: user.emailAddresses[0].emailAddress,
      });
    } catch (e) {
      if (
        isClerkAPIResponseError(e) &&
        e.errors[0].code === 'resource_not_found'
      ) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: 'User id not found',
        });
      }

      throw e;
    }
  });
