FROM alpine:3.10

WORKDIR /app

COPY ./dist /app

LABEL maintainer="Obinna Odirionye"

RUN echo "**** Installing Python v3 ****" && \
    apk add --no-cache python3 && \ 
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi

EXPOSE 3000

CMD  ["python",  "-m", "http.server", "3000"]