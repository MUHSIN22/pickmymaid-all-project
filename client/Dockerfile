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
EXPOSE 3000
CMD ["npm", "run", "dev"]

# =======================
# Build Stage
# =======================
FROM base AS build
# Accept environment variable for build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm ci
COPY . .
COPY .env.staging .
RUN npm run build

# =======================
# Production Stage
# =======================
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env.staging ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
