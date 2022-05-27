FROM node:lts-alpine as build-stage
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . /usr/src/app
EXPOSE 9091
CMD ["npm","start"]

