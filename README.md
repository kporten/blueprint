![logo](./assets/logo.jpg)

# Blueprint

![license](https://img.shields.io/github/license/kporten/blueprint?style=for-the-badge)
![last commit](https://img.shields.io/github/last-commit/kporten/blueprint?style=for-the-badge)
[![checked with biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=for-the-badge&logo=biome)](https://biomejs.dev)

This monorepo blueprint allows you to kickstart your projects with [Bun](https://bun.sh), [Turborepo](https://turbo.build/repo), [Biome](https://biomejs.dev) and [TypeScript](https://www.typescriptlang.org).

Take advantage of the pre-configured setup to accelerate your development process with the efficiency of modern tools.

## Apps

### @blueprint/with-hono

This is a blueprint for a REST API with Hono.

:electric_plug: [Port 8000](http://localhost:8000)

:gem: [README](./apps/with-hono/README.md)

### @blueprint/with-next

This is a blueprint for a web app with Next.js.

:electric_plug: [Port 3000](http://localhost:3000)

:gem: [README](./apps/with-next/README.md)

### @blueprint/with-orpc

This is a blueprint for a typesafe API with oRPC.

:electric_plug: [Port 4000](http://localhost:4000)

:gem: [README](./apps/with-orpc/README.md)

## Getting Started

> [!IMPORTANT]
> Prerequisite is the global installation of [Bun](https://bun.sh/docs/installation) as runtime, [Turborepo](https://turbo.build/repo/docs/installing) for task orchestration and optionally [Docker](https://www.docker.com/) for containerization.

1. Clone the blueprint: `bunx degit kporten/blueprint my-project`
2. Follow the setup instructions in each app blueprint that you want to use.
3. Install the dependencies: `bun install`
4. Start the development servers: `turbo dev`

:tada: Now you can get up and running with your ideas!

## Tasks

### Development

```sh
# start development servers
turbo dev

# build apps
turbo build

# check types
turbo typecheck

# execute tests
turbo test

# execute tests in watch mode
turbo test:watch
```

### Quality

```sh
# check format and lint
turbo check

# fix format and lint issues
turbo check:fix
```

### Database

```sh
# generate database migrations
turbo db:generate

# apply database migrations
turbo db:migrate

# check database migrations
turbo db:check

# push database schemas
turbo db:push

# seed database data
turbo db:seed
```

> [!NOTE]
> Configuration: [turbo.json](./turbo.json)

## Docker

```sh
# build docker images
docker compose build

# start docker containers
docker compose up
```
