FROM docker.io/library/golang:1.21 AS builder

WORKDIR /app

COPY sync_db.go ./sync.go

RUN go mod init sync_db

RUN go mod tidy

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-w -s" -o /app/sync

#FROM scratch
FROM alpine:latest

USER 1000000

WORKDIR /app

EXPOSE 8080

COPY --from=builder /app/sync /app/sync

CMD ["/app/sync"]