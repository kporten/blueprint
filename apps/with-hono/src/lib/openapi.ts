import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import z from 'zod';

export const mimeTypes = {
  json: 'application/json',
} as const;

export const errorSchema = z
  .object({
    status: z.number().openapi({
      example: StatusCodes.INTERNAL_SERVER_ERROR,
    }),
    code: z.string().openapi({
      example: StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
    }),
    message: z.string().openapi({
      example: ReasonPhrases.INTERNAL_SERVER_ERROR,
    }),
  })
  .openapi({ ref: 'Error' });
