FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p /app/public/PCATIMAGES

RUN chmod -R 777 /app/public/PCATIMAGES

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
