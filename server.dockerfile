# Datei: server.dockerfile
FROM node:20-alpine

WORKDIR /app

# --- 1. Dependencies installieren ---
COPY server/package*.json ./
RUN npm install

# --- 2. Code + .env ---
COPY server .
COPY .env .env

# --- 3. Port öffnen und starten ---
EXPOSE 8080
CMD ["npm", "run", "dev"]
