# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN npm ci

COPY backend/ ./backend/
RUN npm run build --workspace=backend

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN npm ci --omit=dev --workspace=backend

COPY --from=build /app/backend/dist ./backend/dist

EXPOSE 3000
CMD ["node", "backend/dist/server.js"]
