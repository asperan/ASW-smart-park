FROM node:buster

RUN apt-get update && apt-get install -y node-typescript

COPY ./ /node-app

WORKDIR /node-app

RUN npm install

CMD ["sh", "-c", "npm start"]