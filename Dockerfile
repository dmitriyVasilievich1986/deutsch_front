FROM node:latest

LABEL author="dmitriyvasil@gmail.com"

ENV REACT_APP_NAME=deutsch

RUN mkdir /app
RUN mkdir -p /app/static/js
WORKDIR /app

COPY ./webpack.config.js /app
COPY ./webpack /app/webpack
COPY ./package.json /app
COPY ./.babelrc /app
COPY ./src /app/src
COPY ./LICENSE /app
COPY ./*.env /app

RUN npm install
CMD npm run build