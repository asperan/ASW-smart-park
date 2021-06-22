FROM node:buster

RUN npm install -g @angular/cli

COPY ./ /node-app

WORKDIR /node-app

RUN npm install

CMD ["sh", "-c", "npm start"]