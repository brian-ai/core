FROM node:8.3

WORKDIR /app

RUN apt-get update
RUN apt-get install -y libasound2-dev

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
