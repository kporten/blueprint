FROM oven/bun:1.2.10-alpine AS base
WORKDIR /app

FROM base AS prune
COPY . .
RUN bunx turbo prune @blueprint/with-hono --docker

FROM base AS install
COPY --from=prune /app/out/json/ .
RUN bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install --chown=bun:bun /app/node_modules node_modules
COPY --from=prune --chown=bun:bun /app/out/full/ .

USER bun
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "apps/with-hono/src/index.ts"]
