import { STATUS_TEXT, type StatusCode } from '@std/http/status';
import { createSchemaFactory } from 'drizzle-zod';
import type { DescribeRouteOptions } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import { z } from 'zod';

import 'zod-openapi/extend';

export const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({ zodInstance: z });

export function createErrorSchema(statusCode: StatusCode) {
  const statusText = STATUS_TEXT[statusCode];

  return z
    .object({
      status: z.number().int().openapi({
        example: statusCode,
      }),
      message: z.string().openapi({
        example: statusText,
      }),
    })
    .openapi({ ref: statusText.replaceAll(' ', '') });
}

export function jsonResponse(schema: z.ZodSchema, description: string) {
  return {
    description,
    content: {
      'application/json': {
        schema: resolver(schema),
      },
    },
  } satisfies NonNullable<DescribeRouteOptions['responses']>[string];
}
