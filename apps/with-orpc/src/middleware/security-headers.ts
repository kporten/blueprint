import { nosecone } from 'nosecone';

import { orpc } from '#lib/orpc';

export const securityHeaders = nosecone({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  originAgentCluster: false,
  referrerPolicy: false,
  xDnsPrefetchControl: false,
  xDownloadOptions: false,
  xFrameOptions: false,
  xPermittedCrossDomainPolicies: false,
  xXssProtection: false,
});

export const securityHeadersMiddleware = orpc.middleware(
  ({ context, next }) => {
    securityHeaders.forEach((value, key) => {
      context.resHeaders?.set(key, value);
    });

    return next();
  },
);
