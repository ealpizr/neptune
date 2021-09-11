FROM golang:1.17.1-alpine3.14

RUN go install github.com/githubnemo/CompileDaemon@1.3.0

WORKDIR /svr

COPY . .

RUN go install ./src

EXPOSE 3001