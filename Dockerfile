FROM alpine:3.8

WORKDIR /app

COPY ./dist /app

LABEL maintainer="Obinna Odirionye"

RUN apk add --no-cache nodejs 
RUN apk add --no-cache npm 
RUN npm i -g http-server


EXPOSE 3000

ENTRYPOINT ["http-server", "-p 3000"]