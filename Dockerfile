FROM node:lts-alpine as build-stage
RUN mkdir -p /usr/app
WORKDIR /usr/app

ARG PORT
ARG HOST

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as deploy-stage
RUN mkdir /app
RUN ls -la
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build-stage /usr/app/dist ./

EXPOSE 9090