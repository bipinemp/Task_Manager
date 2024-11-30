FROM node:21.7.1-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 8000

CMD ["npm", "run", "start"]
