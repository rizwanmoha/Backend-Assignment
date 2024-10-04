
FROM node:alpine

WORKDIR /app


COPY package*.json ./
RUN npm install


COPY prisma ./prisma/


RUN npx prisma generate

COPY . .

ENV JWT_SECRET=asdfasdf


EXPOSE 3000


RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'npx prisma migrate deploy' >> /app/start.sh && \
    echo 'npm start' >> /app/start.sh && \
    chmod +x /app/start.sh


CMD ["/bin/sh", "/app/start.sh"]
