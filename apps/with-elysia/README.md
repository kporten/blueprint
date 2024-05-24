# @blueprint/with-elysia

:electric_plug: [Port 3000](http://localhost:3000)

:books: [Swagger](http://localhost:3000/swagger)

This is an app blueprint for a REST API with Elysia including the following features:

- OpenAPI documentation
- Bearer auth
- Security headers
- Error handling

## Setup

- To use the auth feature you need to create a [Clerk](https://clerk.com) account and get your secret and jwt key.
- Copy the `.env.example` file and rename it to `.env`, then adapt the values where required.

## Tasks

```sh
# start development server
turbo dev --filter=with-elysia

# format files
turbo format --filter=with-elysia

# check format and lint
turbo check --filter=with-elysia

# check types
turbo typecheck --filter=with-elysia
```

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/) as language
- [Bun](https://bun.sh/) as runtime
- [Elysia](https://elysiajs.com/) as web framework
- [Clerk](https://clerk.com) for user auth
