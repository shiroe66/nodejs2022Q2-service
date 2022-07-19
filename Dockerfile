FROM node:16-alpine

EXPOSE 4000

WORKDIR /app
COPY package*.json .

RUN npm install
COPY . .
