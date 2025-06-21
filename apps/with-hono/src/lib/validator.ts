import { STATUS_CODE } from '@std/http/status';
import type { ValidationTargets } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { validator as zValidator } from 'hono-openapi/zod';
import type { ZodSchema } from 'zod';
import { fromZodError, isZodErrorLike } from 'zod-validation-error';

export function validator<
  Target extends keyof ValidationTargets,
  Schema extends ZodSchema,
>(target: Target, schema: Schema) {
  return zValidator(target, schema, (result) => {
    if (!result.success && isZodErrorLike(result.error)) {
      throw new HTTPException(STATUS_CODE.BadRequest, {
        message: fromZodError(result.error).toString(),
      });
    }
  });
}
