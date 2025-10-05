# =======================
# Base Stage
# =======================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# =======================
# Development Stage
# =======================
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]

# =======================
# Production Stage
# =======================
FROM base AS prod
RUN npm ci
COPY . .
EXPOSE 8080
CMD ["npx", "pm2-runtime", "src/server.ts", "--name", "pickmymaid-backend", "--interpreter", "ts-node"]
