#Sample Dockerfile for NodeJS Apps

FROM node:21

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3500

CMD [ "node", "app.js" ]