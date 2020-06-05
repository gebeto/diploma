FROM node:12.13.1-alpine3.9 AS builder

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

RUN yarn build
