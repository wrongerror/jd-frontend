FROM node:6.9.4

MAINTAINER wrongerror appledevspecial@163.com

RUN mkdir /app
WORKDIR /app
ADD hawkeye /app

RUN npm install

RUN npm install pm2 -g

EXPOSE 80 8000 3002
ENTRYPOINT NODE_ENV=production pm2 start hawkeye.js; \
    bash