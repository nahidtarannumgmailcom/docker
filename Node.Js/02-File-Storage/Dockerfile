FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN mkdir -p /app/filestorage

EXPOSE 3000

CMD ["node", "app.js"]

