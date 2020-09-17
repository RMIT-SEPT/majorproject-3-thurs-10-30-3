FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
RUN npm build
COPY . .

CMD ["npm", "start"]