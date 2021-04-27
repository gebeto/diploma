FROM node:12.13.1-alpine3.9 as production
RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN yarn --prod
COPY . .
CMD yarn start


FROM node:12.13.1-alpine3.9 as development
WORKDIR /app
CMD ./start-dev.sh