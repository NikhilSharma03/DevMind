FROM node:14.18.2-alpine

WORKDIR /usr/src/server

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "server:dev"]