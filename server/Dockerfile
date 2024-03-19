FROM golang:1.22

WORKDIR /app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download && go mod verify

# Copy the source from the current directory to the workspace
COPY . .

# Build
RUN go build -o /usr/local/bin/remitano .

EXPOSE 5000

# Run
CMD ["remitano"]

