FROM alpine:3.10

WORKDIR /app

COPY ./dist /app

LABEL maintainer="Obinna Odirionye"

RUN apk add nodejs

RUN npm i -g http-server
   
EXPOSE 8080

CMD  ["http-server", "."]