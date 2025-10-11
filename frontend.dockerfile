# ---- Build Stage ----
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Run Stage ----
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/.output ./

EXPOSE 3000
CMD ["node", "server/index.mjs"]
