# @blueprint/with-hono

:electric_plug: [Port 8000](http://localhost:8000)

This is a blueprint for a REST API with Hono.

- 🚀 [Hono](https://hono.dev) as web framework with centralized error handling, CORS, security headers, timing and logging middleware
- 🗄️ [Drizzle](https://orm.drizzle.team) as ORM with a [Neon](https://neon.tech) PostgreSQL database
- ✅ [Zod](https://zod.dev) for data validation
- 🌍 [T3 Env](https://env.t3.gg) for type-safe environment variables
- 🐳 Docker setup with Bun runtime
- 🧪 Tests with Bun test runner

## Setup

- To use the pre-configured database driver you need to create a [Neon](https://neon.tech) account.
- Copy the `.env.example` file and rename it to `.env`, then adapt the values where required.

## Tasks

### Development

```sh
# start development server
turbo @blueprint/with-hono#dev

# check types
turbo @blueprint/with-hono#typecheck

# execute tests
turbo @blueprint/with-hono#test

# execute tests in watch mode
turbo @blueprint/with-hono#test:watch
```

### Quality

```sh
# check format and lint
turbo @blueprint/with-hono#check

# format files
turbo @blueprint/with-hono#check:fix
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
