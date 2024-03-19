# Build phase
FROM golang:1.22 as builder

WORKDIR /build

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download && go mod verify

# Copy the source from the current directory to the workspace
COPY . .

# Build
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o remitano

# Production phase
FROM alpine:3.14

WORKDIR /app

COPY --from=builder /build/remitano .

EXPOSE 5000

ENTRYPOINT [ "/app/remitano"]