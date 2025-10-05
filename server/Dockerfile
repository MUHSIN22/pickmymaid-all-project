# =======================
# Base Stage
# =======================
FROM node:20-alpine AS base

WORKDIR /app

# Install ts-node globally to run TS directly
RUN npm install -g ts-node pm2 typescript

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# =======================
# Development Stage
# =======================
FROM base AS dev

COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]

# =======================
# Production Stage
# =======================
FROM base AS prod

COPY . .

EXPOSE 8080

# Use pm2-runtime to run your TS backend in production
# Logs are sent to stdout/stderr for Docker
CMD ["npx", "ts-node", "src/server.ts"]
