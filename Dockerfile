# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY ./ .
# RUN npm run generate

# FROM nginx as deploy-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf
# CMD ["nginx", "-g", "daemon off;"]
# EXPOSE  9090

FROM node:lts-alpine as build-stage
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
RUN apk update && apk upgrade
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build
EXPOSE  9090
CMD [ "npm", "start" ]