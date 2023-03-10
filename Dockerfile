FROM amd64/node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM denoland/deno:alpine-1.31.1 as production
WORKDIR /app
COPY --from=builder /app/build .
RUN deno cache index.js
EXPOSE 3000
CMD [ "deno", "run", "-A", "index.js" ]