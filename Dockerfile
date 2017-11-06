FROM node:carbon

COPY package.json .
COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]