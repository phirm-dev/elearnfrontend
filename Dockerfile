FROM jfloff/alpine-python:2.7

WORKDIR /app

COPY ./dist /app

COPY ./server.py /app

LABEL maintainer="Obinna Odirionye"

# RUN echo "**** Installing Python v3 ****" && \
#     apk add --no-cache python3 && \ 
#     if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi

EXPOSE 8080

CMD  ["python",  "server.py"]