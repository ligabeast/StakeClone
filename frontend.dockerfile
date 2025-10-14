FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Package-Dateien kopieren und Dependencies installieren
COPY package*.json ./
RUN npm install

# Rest des Projekts kopieren
COPY . .

# .env einbinden
COPY .env .env

# Port für Nuxt Dev-Server
ENV PORT=3001
EXPOSE 3001

# Nuxt Development Server starten
CMD ["npm", "run", "dev"]
