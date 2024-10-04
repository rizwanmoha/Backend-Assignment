
FROM node:alpine


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .

ENV JWT_SECRET=asdfasdf

EXPOSE 8000


CMD ["npm", "start"]
