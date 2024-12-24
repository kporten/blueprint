import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import type { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export function validatorDefaultHook(
  result:
    | {
        success: true;
      }
    | {
        success: false;
        error: ZodError;
      },
) {
  if (!result.success) {
    throw new HTTPException(StatusCodes.BAD_REQUEST, {
      message: fromZodError(result.error).toString(),
    });
  }
}
