# @blueprint/with-hono

:electric_plug: [Port 3000](http://localhost:3000)

This is a blueprint for a REST API including the following features:

- OpenAPI specification
- PostgreSQL database setup with [Neon](https://neon.tech)
- Middleware setup for CORS, Secure Headers, Timing and Logger
- Centralized error handling
- Example routes and tests for tasks
- Optional Docker setup (Dockerfile and Docker Compose)

## Setup

- To use the pre-configured database driver you need to create a [Neon](https://neon.tech) account.
- Copy the `.env.example` file and rename it to `.env`, then adapt the values where required.

## Tasks

### Server

```sh
# start development server
turbo @blueprint/with-hono#dev
```

### Quality

```sh
# check types
turbo @blueprint/with-hono#typecheck

# check format and lint
turbo @blueprint/with-hono#check

# format files
turbo @blueprint/with-hono#format
```

### Tests

```sh
# execute tests
turbo @blueprint/with-hono#test

# execute tests in watch mode
turbo @blueprint/with-hono#test:watch
```

### Database

```sh
# generate database migrations
turbo @blueprint/with-hono#db:generate

# apply database migrations
turbo @blueprint/with-hono#db:migrate

# check database migrations
turbo @blueprint/with-hono#db:check

# push database schema
turbo @blueprint/with-hono#db:push

# seed database data
turbo @blueprint/with-hono#db:seed
```

## Tools

```sh
# https://orm.drizzle.team/docs/kit-overview
bunx drizzle-kit [command]
```

## Tech Stack

- [Hono](https://hono.dev) with [Hono OpenAPI](https://github.com/rhinobase/hono-openapi) as web framework
- [Drizzle](https://orm.drizzle.team/) as ORM
- [Zod](https://zod.dev) for data validation
- [Scalar](https://scalar.com) as OpenAPI reference user interface
