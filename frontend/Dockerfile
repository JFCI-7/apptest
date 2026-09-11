# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN npm ci

# No existen tsconfig.node.json, tailwind.config.* ni postcss.config.* en este proyecto.
COPY frontend/index.html frontend/tsconfig.json frontend/vite.config.ts frontend/vitest.config.ts ./frontend/
COPY frontend/src ./frontend/src
RUN npm run build --workspace=frontend

FROM nginx:alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
