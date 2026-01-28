# Development stage
FROM node:20-alpine AS dev
WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend .

# Start Angular dev server with host binding
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

# Production stage (Build)
FROM node:20-alpine AS build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend .
RUN npm run build

# Step 2 — NGINX
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# 👇 Correct Angular build folder
COPY --from=build /app/dist/unicourt-clone /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
