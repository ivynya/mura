FROM golang:1.20-alpine as builder
WORKDIR /go/src/app
COPY ./api /go/src/app
RUN go build -o app .

FROM alpine:3.17 as production
WORKDIR /app
COPY --from=builder /go/src/app/app .
EXPOSE 3000
CMD ["./app"]