FROM node:current-alpine3.17

WORKDIR /app

ADD . /app

RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

RUN npm install -g pm2

ENV APP_PORT 80
EXPOSE 80

CMD ["pm2-runtime", "start", "npm", "--", "start"]


