# Étape 1 : Build Angular
FROM node:22.12-alpine AS builder
WORKDIR /app

COPY package.json angular.json tsconfig.json tsconfig.app.json ./

RUN npm install

COPY src ./src
COPY scripts ./scripts
COPY public ./public

RUN npm install entities@2.2.0

ARG BUILD_CONFIGURATION=staging
RUN echo "Building Angular app with configuration: ${BUILD_CONFIGURATION}"

RUN npx ng build --configuration=${BUILD_CONFIGURATION} --output-path=dist/frontend --base-href=/

RUN ls -l /app/dist/frontend
RUN ls -l /app/dist/frontend/browser
RUN ls -l /app/dist/frontend/browser/assets


FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/frontend/browser/. ./


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


    

