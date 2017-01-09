FROM node:6.9.4

MAINTAINER wrongerror appledevspecial@163.com

RUN mkdir /app
WORKDIR /app
ADD hawkeye /app

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install \
    && cnpm install pm2 -g

EXPOSE 80 8000 3002
ENTRYPOINT NODE_ENV=production pm2 start hawkeye.js; \
    bash
