FROM node:22-alpine

WORKDIR /currex/currex

COPY package*.json ./

USER node

RUN npm install

COPY . .

EXPOSE 8172

CMD ["npm", "run", "start"]