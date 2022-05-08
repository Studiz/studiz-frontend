FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
EXPOSE 9090

FROM nginx as deploy-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /usr/share/nginx/html/studiz-student/
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]