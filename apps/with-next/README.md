# @blueprint/with-next

:electric_plug: [Port 3000](http://localhost:3000)

This is a blueprint for a web app including the following features:

- Internationalization
- [Shadcn UI](https://ui.shadcn.com) for UI components
- PostgreSQL database setup with [Neon](https://neon.tech)
- Docker (Next.js standalone output)

## Setup

- To use the pre-configured database driver you need to create a [Neon](https://neon.tech) account.
- Copy the `.env.example` file and rename it to `.env`, then adapt the values where required.

## Tasks

### Development

```sh
# start development server
turbo @blueprint/with-next#dev

# build application
turbo @blueprint/with-next#build
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
- [Next Intl](https://next-intl.dev) for internationalization
- [Tailwind CSS](https://tailwindcss.com/) as CSS framework
- [Nuqs](https://nuqs.47ng.com/) for type-safe search params
- [oRPC](https://orpc.unnoq.com/) for server actions
- [Drizzle](https://orm.drizzle.team/) as ORM
- [Zod](https://zod.dev) for data validation
