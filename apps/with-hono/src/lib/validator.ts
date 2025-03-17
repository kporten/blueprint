import { STATUS_CODE } from '@std/http/status';
import { HTTPException } from 'hono/http-exception';
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
    throw new HTTPException(STATUS_CODE.BadRequest, {
      message: fromZodError(result.error).toString(),
    });
  }
}
