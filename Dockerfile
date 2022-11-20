FROM node:18 AS base

WORKDIR /app

FROM base as workspace
COPY . .
RUN  corepack yarn

FROM workspace AS server-builder
RUN  corepack yarn workspace @ucenter/server build

FROM base AS server
COPY --from=server-builder /app/packages/server/lib          /app/lib
COPY --from=server-builder /app/packages/server/public       /app/public
COPY --from=server-builder /app/packages/server/package.json /app/package.json
RUN  yarn --production
CMD  yarn start
