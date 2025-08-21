FROM node:22.12-alpine AS builder
WORKDIR /app

COPY package.json angular.json tsconfig.json tsconfig.app.json ./
RUN npm install

COPY src ./src
COPY scripts ./scripts
COPY . .
RUN npm install entities@2.2.0
RUN npx ng build --configuration=staging

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/frontend ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

    

