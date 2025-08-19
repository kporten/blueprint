import { STATUS_CODE } from '@std/http/status';
import type { ValidationTargets } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { validator as honoValidator } from 'hono/validator';
import * as z4 from 'zod/v4/core';

export const validator = <
  Target extends keyof ValidationTargets,
  Schema extends z4.$ZodType,
>(
  target: Target,
  schema: Schema,
) =>
  honoValidator(target, (value) => {
    const parsed = z4.safeParse(schema, value);

    if (!parsed.success) {
      throw new HTTPException(STATUS_CODE.BadRequest, {
        message: z4.prettifyError(parsed.error),
        cause: parsed.error,
      });
    }

    return parsed.data;
  });
