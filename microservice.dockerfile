FROM golang:1.22-alpine AS build

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o roulette .

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/roulette .
EXPOSE 8080

CMD ["./roulette"]
