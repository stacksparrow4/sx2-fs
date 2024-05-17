FROM node:18-alpine

RUN apk add nginx

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

RUN mkdir static
COPY static ./static
COPY index.js ./

COPY nginx.conf /etc/nginx/http.d/default.conf

CMD nginx && node index.js
