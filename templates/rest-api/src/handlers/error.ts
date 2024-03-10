import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';
import { envTyped } from '~/utils/adapter';

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    c.error = undefined;

    return c.json(
      {
        status: err.status,
        code: StatusCodes[err.status],
        message: err.message || getReasonPhrase(err.status),
      },
      err.status,
    );
  }

  if (envTyped(c).NODE_ENV === 'development') {
    console.error(err);
  }

  return c.json(
    {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      code: StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    },
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
};
