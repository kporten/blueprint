FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS prune
COPY . .
RUN bun install --yarn
RUN bunx json -I -f package.json -e "this.packageManager=\"yarn@$(bunx yarn --version)\""
RUN bunx turbo prune @blueprint/with-hono --docker

FROM base AS install
COPY --from=prune /app/out/json/ /tmp/production/
RUN cd /tmp/production && bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install --chown=bun:bun /tmp/production/node_modules ./node_modules
COPY --from=prune --chown=bun:bun /app/out/full/ .

USER bun
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "/app/apps/with-hono/src/index.ts"]
