FROM golang:1.23-alpine AS build

WORKDIR /app

# go.mod aus Root laden
COPY ../../go.mod ../../go.sum ./
RUN go mod download

# gesamten Code ins Image kopieren
COPY . .

# baue den Roulette-Service
RUN go build -o roulette ./microservices/roulette

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/roulette .
EXPOSE 8080

CMD ["./roulette"]
