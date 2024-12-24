# @blueprint/with-hono

:electric_plug: [Port 3000](http://localhost:3000)

This is a blueprint for a REST API including the following features:

- Middleware setup: CORS, Secure Headers, Timing, Logger
- OpenAPI specification via [Hono OpenAPI](https://github.com/rhinobase/hono-openapi)
- Centralized error handling
- Example route set for `/tasks`

## Tasks

```sh
# start development server
turbo @blueprint/with-hono#dev

# check types
turbo @blueprint/with-hono#typecheck

# check format and lint
turbo @blueprint/with-hono#check

# format files
turbo @blueprint/with-hono#format
```

## Tech Stack

- [Hono](https://hono.dev) as web framework
- [Zod](https://zod.dev) for data validation
- [Scalar](https://scalar.com) as OpenAPI reference user interface
