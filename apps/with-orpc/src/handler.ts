import { experimental_SmartCoercionPlugin as SmartCoercionPlugin } from '@orpc/json-schema';
import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { ORPCError, onError } from '@orpc/server';
import {
  CORSPlugin,
  RequestHeadersPlugin,
  ResponseHeadersPlugin,
} from '@orpc/server/plugins';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';

import { orpcLogger } from '#lib/logger';
import { RequestLoggerPlugin } from '#plugins/request-logger';
import router from '#router';

import pkg from '../package.json';

export default new OpenAPIHandler(router, {
  plugins: [
    new CORSPlugin({
      origin: (origin) => {
        return origin || undefined;
      },
    }),
    new RequestHeadersPlugin(),
    new ResponseHeadersPlugin(),
    new RequestLoggerPlugin(),
    new SmartCoercionPlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: pkg.name,
          description: pkg.description,
          version: pkg.version,
        },
      },
      docsConfig: {
        theme: 'alternate',
      },
    }),
  ],
  interceptors: [
    onError((error, { request }) => {
      if (error instanceof Error && !(error instanceof ORPCError)) {
        orpcLogger.error(`OpenAPIHandler Error: ${error.message}`, {
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
          method: request.method,
          url: request.url,
        });
      }
    }),
  ],
});
