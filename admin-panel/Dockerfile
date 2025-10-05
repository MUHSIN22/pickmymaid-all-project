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
EXPOSE 5173
CMD ["npm", "run", "dev"]

# =======================
# Build Stage
# =======================
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# =======================
# Production Stage
# =======================
FROM nginx:stable-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
