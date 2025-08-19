import { os } from '@orpc/server';
import type {
  RequestHeadersPluginContext,
  ResponseHeadersPluginContext,
} from '@orpc/server/plugins';

interface OrpcContext
  extends RequestHeadersPluginContext,
    ResponseHeadersPluginContext {}

export const orpc = os
  .$context<OrpcContext>()
  .$route({ inputStructure: 'detailed' });
