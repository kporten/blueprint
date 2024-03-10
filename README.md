![logo](./assets/logo.jpg)

# Blueprint

![license](https://img.shields.io/github/license/kporten/blueprint?style=for-the-badge)
![tag](https://img.shields.io/github/v/tag/kporten/blueprint?style=for-the-badge)
![last-commit](https://img.shields.io/github/last-commit/kporten/blueprint?style=for-the-badge)

This monorepo blueprint allows you to kickstart your projects with [Bun](https://bun.sh), [Turborepo](https://turbo.build/repo), [Biome](https://biomejs.dev) and [TypeScript](https://www.typescriptlang.org).

Take advantage of the pre-configured setup and project templates to accelerate your development process with the efficiency and power of modern tools.

## Templates

### REST API

:electric_plug: [Port 3000](http://localhost:3000)

:gem: [templates/rest-api](./templates/rest-api)

- [Hono](https://hono.dev) as web framework
- [Zod](https://zod.dev) for data validation
- [Clerk](https://clerk.com) for user auth
- [Sentry](https://sentry.io) for error monitoring

## Packages

### TypeScript Configuration

:package: [packages/typescript-config](./packages/typescript-config)

## Getting Started

> [!IMPORTANT]
> Prerequisite is the global installation of [Bun](https://bun.sh/docs/installation) and [Turborepo](https://turbo.build/repo/docs/installing).

1. Clone the template: `bunx degit kporten/blueprint my-project`
2. Follow the setup instructions in each template that you want to use.
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
