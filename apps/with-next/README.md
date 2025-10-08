# @blueprint/with-next

:electric_plug: [Port 3000](http://localhost:3000)

This is a blueprint for a web app with Next.js.

- ⚡ [Next.js](https://nextjs.org) as web framework
- 🎨 [Shadcn UI](https://ui.shadcn.com) and [Tailwind CSS](https://tailwindcss.com) for UI components
- 🌐 [Next Intl](https://next-intl.dev) for internationalization
- 🔍 [Nuqs](https://nuqs.47ng.com) for type-safe search params
- 🗄️ [Drizzle](https://orm.drizzle.team) as ORM with a [Neon](https://neon.tech) PostgreSQL database
- ✅ [Zod](https://zod.dev) for data validation
- 🔒 [Arcjet Nosecone](https://docs.arcjet.com/nosecone/quick-start) for security headers
- 🌍 [T3 Env](https://env.t3.gg) for type-safe environment variables
- 🐳 Docker setup with Bun runtime (Next.js standalone output)

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

# check types
turbo @blueprint/with-next#typecheck
```

### Quality

```sh
# check format and lint
turbo @blueprint/with-next#check

# format files
turbo @blueprint/with-next#check:fix
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

# seed database data
turbo @blueprint/with-next#db:seed
```

## Tools

```sh
# https://orm.drizzle.team/docs/kit-overview
bunx drizzle-kit [command]
```
