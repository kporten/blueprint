import type { NotFoundHandler } from 'hono';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const notFoundHandler: NotFoundHandler = (c) => {
  return c.json(
    {
      status: StatusCodes.NOT_FOUND,
      code: StatusCodes[StatusCodes.NOT_FOUND],
      message: ReasonPhrases.NOT_FOUND,
    },
    StatusCodes.NOT_FOUND,
  );
};
