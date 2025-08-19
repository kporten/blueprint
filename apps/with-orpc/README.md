# @blueprint/with-orpc

:electric_plug: [Port 4000](http://localhost:4000)

This is a blueprint for a typesafe API with oRPC.

- 🔌 [oRPC](https://orpc.unnoq.com) as type-safe API with OpenAPI documentation, centralized error handling and recommended plugins
- 🗄️ [Drizzle](https://orm.drizzle.team) as ORM with a [Neon](https://neon.tech) PostgreSQL database
- ✅ [Zod](https://zod.dev) for data validation
- 📝 [LogTape](https://logtape.org) for universal logging
- 🔒 [Arcjet Nosecone](https://docs.arcjet.com/nosecone/quick-start) for security headers
- 🌍 [T3 Env](https://env.t3.gg) for type-safe environment variables
- 🐳 Docker setup with Bun runtime

## Setup

- To use the pre-configured database driver you need to create a [Neon](https://neon.tech) account.
- Copy the `.env.example` file and rename it to `.env`, then adapt the values where required.

## Tasks

### Development

```sh
# start development server
turbo @blueprint/with-orpc#dev

# check types
turbo @blueprint/with-orpc#typecheck
```

### Quality

```sh
# check format and lint
turbo @blueprint/with-orpc#check

# format files
turbo @blueprint/with-orpc#check:fix
```

### Database

```sh
# generate database migrations
turbo @blueprint/with-orpc#db:generate

# apply database migrations
turbo @blueprint/with-orpc#db:migrate

# check database migrations
turbo @blueprint/with-orpc#db:check

# push database schema
turbo @blueprint/with-orpc#db:push

# seed database data
turbo @blueprint/with-orpc#db:seed
```

## Tools

```sh
# https://orm.drizzle.team/docs/kit-overview
bunx drizzle-kit [command]
```
