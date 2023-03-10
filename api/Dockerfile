FROM golang:1.20-alpine
WORKDIR /go/src/app
COPY ./api /go/src/app
RUN go build -o app .
EXPOSE 3000

CMD ["./app"]