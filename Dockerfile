# Build Base
FROM node:18-alpine as BASE
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:18-alpine AS BUILD
WORKDIR /app
ARG ENV
ENV NODE_ENV $ENV
COPY ./envs/.env.$ENV .env
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache curl \ 
  && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
  && apk del curl
RUN apk add --no-cache git curl \
    && yarn build \
    && cd .next/standalone \
    && node-prune

# Build Production
FROM node:18-alpine AS PRODUCTION
WORKDIR /app
COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/.npmrc ./
COPY --from=BUILD /app/next.config.js ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
