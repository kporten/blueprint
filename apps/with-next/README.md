# @blueprint/with-next

:electric_plug: [Port 3000](http://localhost:3000)

This is a blueprint for a web app including the following features:

- Internationalization setup
- PostgreSQL database setup with [Neon](https://neon.tech)
- Next.js Standalone Mode Docker setup (Dockerfile and Docker Compose)

## Setup

- To use the pre-configured database driver you need to create a [Neon](https://neon.tech) account.
- Copy the `.env.example` file and rename it to `.env`, then adapt the values where required.

## Tasks

### Server

```sh
# start development server
turbo @blueprint/with-next#dev
```

### Quality

```sh
# check types
turbo @blueprint/with-next#typecheck

# check format and lint
turbo @blueprint/with-next#check

# format files
turbo @blueprint/with-next#format
```

### Database

```sh
# generate database migrations
turbo @blueprint/with-next#db:generate

# apply database migrations
turbo @blueprint/with-next#db:migrate

# check database migrations
turbo @blueprint/with-next#db:check

# push database schema
turbo @blueprint/with-next#db:push
```

## Tools

```sh
# https://orm.drizzle.team/docs/kit-overview
bunx drizzle-kit [command]
```

## Tech Stack

- [Next.js](https://nextjs.org) as web framework
- [Next-Intl](https://next-intl.dev) for internationalization
- [Nuqs](https://nuqs.47ng.com/) for type-safe search params
- [oRPC](https://orpc.unnoq.com/) for server actions
- [Shadcn/UI](https://ui.shadcn.com) for UI components
- [Drizzle](https://orm.drizzle.team/) as ORM
- [Zod](https://zod.dev) for data validation
