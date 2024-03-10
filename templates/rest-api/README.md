# REST API

:electric_plug: [Port 3000](http://localhost:3000)

This is a blueprint for a REST API including the following features:

- OpenAPI
- Auth
- Secure headers
- Error monitoring
- Health endpoint

> [!NOTE]
> An example route set for `/users` is included.

## Setup

- To use the auth feature you need to create a [Clerk](https://clerk.com) account and get your secret and publishable key.
- To use the error monitoring feature you need to create a [Sentry](https://sentry.io) account and get your DSN.
- Copy the `.env.example` file and rename it to `.env`, then adapt the values where required.

## Tasks

```sh
# start development server
turbo dev --filter=rest-api

# check types
turbo typecheck --filter=rest-api

# check format and lint
turbo check --filter=rest-api

# format files
turbo format --filter=rest-api
```

## Tech Stack

- [Hono](https://hono.dev) as web framework
- [Scalar](https://scalar.com) as OpenAPI reference user interface
- [Zod](https://zod.dev) for data validation
- [Clerk](https://clerk.com) for user auth
- [Sentry](https://sentry.io) for error monitoring
