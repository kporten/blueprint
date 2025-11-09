FROM oven/bun:1.3.2-alpine AS base
WORKDIR /app

FROM base AS prune
COPY . .
RUN bunx turbo prune @blueprint/with-next --docker

FROM base AS install
COPY --from=prune /app/out/json .
RUN bun install --frozen-lockfile --linker=isolated
COPY --from=prune /app/out/full .
RUN bunx turbo run build

FROM base AS release
COPY --from=install --chown=bun:bun /app/apps/with-next/.next/standalone .
COPY --from=install --chown=bun:bun /app/apps/with-next/.next/static ./apps/with-next/.next/static
# COPY --from=install --chown=bun:bun /app/apps/with-next/public ./apps/with-next/public

USER bun
CMD ["bun", "run", "apps/with-next/server.js"]
