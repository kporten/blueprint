import { STATUS_TEXT, type StatusCode } from '@std/http/status';
import { z } from 'zod';

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
    .openapi({ ref: statusText });
}
