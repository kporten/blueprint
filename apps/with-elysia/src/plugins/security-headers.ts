import { Elysia } from 'elysia';

export const securityHeaders = () =>
  new Elysia({
    name: 'security-headers',
  }).onRequest(({ set }) => {
    set.headers['Content-Security-Policy'] = "frame-ancestors 'none'";
    set.headers['Strict-Transport-Security'] =
      'max-age=15552000; includeSubDomains; preload';
    set.headers['X-Content-Type-Options'] = 'nosniff';
  });
