import { type OpenAPIHonoOptions, z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { fromZodError } from 'zod-validation-error';
import type { HonoEnv } from '~/types/hono';

export const SecuritySchemes = {
  bearerAuth: 'bearerAuth',
} as const;

export const MimeTypes = {
  'application/json': 'application/json',
} as const;

export const BadRequestErrorSchema = z
  .object({
    status: z.number().openapi({
      example: StatusCodes.BAD_REQUEST,
    }),
    code: z.string().openapi({
      example: StatusCodes[StatusCodes.BAD_REQUEST],
    }),
    message: z.string().openapi({
      example: ReasonPhrases.BAD_REQUEST,
    }),
  })
  .openapi('BadRequestError');

export const NotFoundErrorSchema = z
  .object({
    status: z.number().openapi({
      example: StatusCodes.NOT_FOUND,
    }),
    code: z.string().openapi({
      example: StatusCodes[StatusCodes.NOT_FOUND],
    }),
    message: z.string().openapi({
      example: ReasonPhrases.NOT_FOUND,
    }),
  })
  .openapi('NotFoundError');

export const defaultHook: OpenAPIHonoOptions<HonoEnv>['defaultHook'] = (
  result,
) => {
  if (!result.success) {
    throw new HTTPException(StatusCodes.BAD_REQUEST, {
      message: fromZodError(result.error).toString(),
    });
  }
};
