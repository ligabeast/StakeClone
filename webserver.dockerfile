FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Nur package.json zuerst kopieren (Cache bleibt besser)
COPY server/package*.json ./

# Dependencies installieren
RUN npm install

# Jetzt den gesamten Serverinhalt kopieren
COPY server/ ./

# .env hinzufügen
COPY .env .env

# Port öffnen
EXPOSE 8080

# Startbefehl
CMD ["npm", "run", "dev"]
