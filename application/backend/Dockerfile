FROM node:12.13.1-alpine3.9

RUN mkdir /app
WORKDIR /app

COPY package.json package.json

RUN yarn --prod

COPY . .

CMD yarn start