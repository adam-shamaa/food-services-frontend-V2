FROM node:22.7.0-slim as base
WORKDIR /app
COPY package.json package-lock.json .npmrc ./

# Dev environment doesn't run this stage or beyond
FROM base as build
COPY . .
RUN npm install

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/food-services-frontend /usr/share/nginx/html

EXPOSE 4200