# Compile stage
FROM golang:1.13.8 AS build-env
ADD . /dockerdev
WORKDIR /dockerdev
#mudar para caminho relativo after test
RUN go build /server 
# Final stage
FROM debian:buster
EXPOSE 6060
WORKDIR /
#mudar para caminho relativo after test
COPY --from=build-env /server /
CMD ["/server"]