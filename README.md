![logo](./assets/logo.jpg)

# Blueprint

![license](https://img.shields.io/github/license/kporten/blueprint?style=for-the-badge)
![tag](https://img.shields.io/github/v/tag/kporten/blueprint?style=for-the-badge)
![last-commit](https://img.shields.io/github/last-commit/kporten/blueprint?style=for-the-badge)

This monorepo blueprint allows you to kickstart your projects with [Bun](https://bun.sh), [Turborepo](https://turbo.build/repo), [Biome](https://biomejs.dev) and [TypeScript](https://www.typescriptlang.org).

Take advantage of the pre-configured setup and app blueprints to accelerate your development process with the efficiency and power of modern tools.

## Apps

### @blueprint/app-with-elysia

This is an app blueprint for a REST API with Elysia.

:electric_plug: [Port 3000](http://localhost:3000)

:gem: [README](./apps/with-elysia/README.md)

## Getting Started

> [!IMPORTANT]
> Prerequisite is the global installation of [Bun](https://bun.sh/docs/installation) and [Turborepo](https://turbo.build/repo/docs/installing).

1. Clone the blueprint: `bunx degit kporten/blueprint my-project`
2. Follow the setup instructions in each app blueprint that you want to use.
3. Install the dependencies: `bun install`
4. Start the development servers: `turbo dev`

:tada: Now you can get up and running with your ideas!

## Tasks

```sh
# check format and lint
turbo check

# start development servers
turbo dev

# format files
turbo format

# check types
turbo typecheck
```

> [!NOTE]
> Configuration: [turbo.json](./turbo.json)
