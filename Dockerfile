FROM node:20.7-alpine AS builder
WORKDIR /app

COPY package.json angular.json tsconfig.json tsconfig.app.json ./ 
RUN npm install

COPY src ./src
COPY scripts ./scripts
COPY . .
RUN npm install entities@2.2.0
RUN npx ng build --configuration=staging

FROM node:20.7-alpine
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]
