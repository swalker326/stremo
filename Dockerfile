# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.14.0
FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

# Install curl
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install pnpm and turbo
RUN npm install -g pnpm turbo

# Copy the entire project over
COPY . .

# Install all dependencies
RUN npm install -g bun
RUN pnpm install --filter=ws-server
RUN pnpm run build --filter=ws-server

# Run bun src/index.ts
CMD ["pnpm", "start", "--filter=ws-server"]